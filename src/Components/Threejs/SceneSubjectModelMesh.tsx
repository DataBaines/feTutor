import { ILinkbarUserData } from '../../Interfaces/IModel';
import * as THREE from 'three'
import { I3Point, IFe3NodeState } from '../../Interfaces/IState';

/*************************************************
 * Creates the ThreeJS model from the Java object
 * Rebuild triggered by a change in the modelProps
 *************************************************/
const SceneSubjectStaticMesh = (scene: THREE.Scene, modelProps) => {    
    const group = new THREE.Group();

    let maxDimension = 600 //Largest viewable object height or width
    let latestModelProps

    let transform = {
        centreX: 0,
        centreY: 0,
        centreZ: 0,
        scale: 1,
        zScale:180,
    }
    
    let perimeter = {
        blCorner: {x:999, y:999},
        trCorner: {x:-999, y:-999},
    }

    // axes
    const axes = new THREE.AxesHelper( 600 );
    scene.add( axes );

    let shapes: THREE.Object3D
    shapes = new THREE.Object3D();
    group.add(shapes)
    scene.add(group)
    
    function onMeshChange(modelProps: any) {
        latestModelProps = modelProps
        refreshSubjects(latestModelProps);
    }

    function onSelectedNodeChange(modelProps: any) {
        latestModelProps = modelProps
        // const {nodeColour, nodeColourSelected, nodeColourMoveable} = latestModelProps.threeControl.content
        const selectedNodeID = latestModelProps.selNode ? latestModelProps.selNode.nodeID : -1
        refreshAllNodes(selectedNodeID )
    }

    function onSelectedElementChange(modelProps: any) {
        latestModelProps = modelProps
        const {elementColour, elementColourSelected} = latestModelProps.threeControl.content

        if(latestModelProps.selElement) {
            refreshAllSelectedElementColours(latestModelProps.selElement.elementID, elementColour, elementColourSelected)
        }
    }

    function onMoveNodesChange(modelProps: any) {
        latestModelProps = modelProps
        const selectedNodeID = latestModelProps.selNode ? latestModelProps.selNode.nodeID : -1
        refreshAllNodes(selectedNodeID )
    }

    function onWindowResize(width: number, height: number)
    {
        setMaxDimension(width, height)
       latestModelProps && refreshSubjects(latestModelProps)
    }

    //console.log('BR x:' + shapes[0].position.x +' y:'+ shapes[0].position.y)
    function refreshSubjects(modelProps) {
        purgeSubjects();
        createSubjectsFromProps(modelProps);
    }

    function createSubjectsFromProps(props){
        setTransformParameters(props)
        console.log("Recreating visual model - props.node:")
        let p1: I3Point = {x: 0, y: 0, z: 0}
        let p2: I3Point = {x: 0, y: 0, z: 0}
        let p3: I3Point = {x: 0, y: 0, z: 0}

        if(props.fe3Mesh.elements != undefined){
            for (let index = 0; index < props.fe3Mesh.elements.length; index++) {
                const triangle = props.fe3Mesh.elements[index];
                p1 = {x: triangle.point1.x, y: triangle.point1.y, z: props.mesh3D.on ? triangle.value1 : 0} // z:1
                p2 = {x: triangle.point2.x, y: triangle.point2.y, z: props.mesh3D.on ? triangle.value2 : 0}
                p3 = {x: triangle.point3.x, y: triangle.point3.y, z: props.mesh3D.on ? triangle.value3 : 0}
                const isSelected = triangle.id === props.selElement.elementID
                const {elementDepth, elementColour, elementColourSelected} = props.threeControl.content

                createBufferGeometryElement(p1, p2, p3, triangle.id, isSelected, elementDepth, elementColour, elementColourSelected)                
            }
        } 

        if(props.fe3Mesh.nodes != undefined){
            for (let index = 0; index < props.fe3Mesh.nodes.length; index++) {
                const node = props.fe3Mesh.nodes[index];
                p1 = {x: node.point1.x, y: node.point1.y, z: node.val} //z:0
                updatePerimeter(p1)
                const {nodeRadius} = props.threeControl.content
                const nodeRad = props.fe3Mesh.stage > 1 ? nodeRadius : nodeRadius * 1.50 //Extra fat while adding nodes to the perimeter
                const zVal = props.mesh3D.on ? node.val : 0

                //Use the value as the Z position to give a 3D shape
                createNode(node.point1.x, node.point1.y, zVal, node.id, nodeRad)
            }
            
            //If we have nodes then draw the backplane once the mesh has been created
            if(props.fe3Mesh.stage > 1)
            {
                p1 = {x:perimeter.blCorner.x, y:perimeter.blCorner.y, z:0}
                p2 = {x:perimeter.trCorner.x, y:perimeter.trCorner.y, z:0}
                createBackPlane(p1, p2)
            }
        }

        if(props.fe3Mesh.linkBars != undefined){
            for (let index = 0; index < props.fe3Mesh.linkBars.length; index++) {
                const lb = props.fe3Mesh.linkBars[index];
                p1 = {x: lb.point1.x, y: lb.point1.y, z: props.mesh3D.on ? lb.value1 : 0}
                p2 = {x: lb.point2.x, y: lb.point2.y, z: props.mesh3D.on ? lb.value2 : 0}
                const {linkbarRadius, linkbarColour} = props.threeControl.content
                const lbRad = props.fe3Mesh.stage > 1 ? linkbarRadius : linkbarRadius * 2.00 //Extra thick while adding nodes to the perimeter

                createLinkBar(p1, p2, lb.isBoundaryV, lb.isBoundaryH, lbRad, linkbarColour)
            }
        }
    }


	function createNode(posX: number, posY: number, posZ: number, id: number, radius: number) {
		const segments = 16, rings = 16;
        const nodeProperties = CreateLatestNodeProperties(id)
        const {colour, userData} = nodeProperties
        //console.log(`Adding node: x:${posX} y:${posY} z:${posZ} id:${id}` )

		// create the sphere's material in red
		const nodeMaterial = new THREE.MeshPhongMaterial( {color: colour, wireframe:false});

		// Create a sphere, and save it's original points to our own array
		const sphereMesh = new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, rings),
			nodeMaterial);
		sphereMesh.position.x = (posX - transform.centreX) * transform.scale
		sphereMesh.position.y = (posY - transform.centreY) * transform.scale
		sphereMesh.position.z = (posZ - transform.centreZ) * transform.zScale
		
		sphereMesh.castShadow = true;
        sphereMesh.receiveShadow = true;
        sphereMesh.userData = userData
		//Add the sphere to our scene
		shapes.add(sphereMesh);
	}
  
	function createLinkBar(point1: I3Point, point2: I3Point, isBV: boolean, isBH: boolean, radius: number, colour: string){
			//Make a cylinder
		const radiusTopBottom = radius;
        let cylinderHeight = vectorDistance(point1, point2, transform.scale, transform.zScale);
        const xyHyp = point1.x - point2.x

        let originOffsetvalue = 0

        if (isBH) {
            originOffsetvalue = point1.x
        } else if (isBV) {
            originOffsetvalue = point1.y
        } 

		const cylinderSegments = 30;
		const cylinderMesh = new THREE.Mesh(
		    new THREE.CylinderGeometry(radiusTopBottom, radiusTopBottom, cylinderHeight, cylinderSegments, cylinderSegments),
            new THREE.MeshPhongMaterial({color:colour})        
        );
        
		cylinderMesh.position.x = findCentre((point1.x - transform.centreX), (point2.x - transform.centreX)) * transform.scale;
		cylinderMesh.position.y = findCentre((point1.y - transform.centreY), (point2.y - transform.centreY)) * transform.scale;
		cylinderMesh.position.z = findCentre((point1.z - transform.centreZ), (point2.z - transform.centreZ)) * transform.zScale;// 0;

        cylinderMesh.rotation.x = degreesToRadians(calcAngle((point1.y - point2.y) * transform.scale, (point1.z - point2.z) * transform.zScale) )
        cylinderMesh.rotation.y = degreesToRadians(0)
        cylinderMesh.rotation.z = degreesToRadians(calcAngle(calcHyp((point1.y - point2.y) * transform.scale, (point1.z - point2.z) * transform.zScale), (point1.x - point2.x) * transform.scale ) * -1.00)
		cylinderMesh.castShadow = true;
        cylinderMesh.receiveShadow = true;
        const ud: ILinkbarUserData = {
            id: 0,
            objType: 'linkbar', 
            isBoundaryV: isBV, 
            isBoundaryH: isBH, 
            height: cylinderHeight,
            originOffset: originOffsetvalue,
            xyScale: transform.scale
        }
        cylinderMesh.userData = ud

		shapes.add(cylinderMesh);
		//console.log("cylinder x:" + radiansToDegrees(cylinder.rotation.x) + " z:" + radiansToDegrees(cylinder.rotation.z) + " ht:" + cylinderHeight )
	}

 
    function createBufferGeometryElement(point1: I3Point, point2: I3Point, point3: I3Point, id: number, isSelected: boolean, elDepth: number, colour: string, colourSelected: string) {
		const dep = 1
        const col = isSelected ? colourSelected:colour
        // Change from MeshLambertMaterial
        const elementMaterial = new THREE.MeshBasicMaterial( {color: col, wireframe:false});

        //https://discourse.threejs.org/t/three-geometry-will-be-removed-from-core-with-r125/22401
        const geo = new THREE.BufferGeometry()
        const arr9point = new Float32Array( [
            (point1.x - transform.centreX) * transform.scale, 
            (point1.y - transform.centreY) * transform.scale,
            (point1.z) * transform.zScale,
              
            (point2.x - transform.centreX) * transform.scale, 
            (point2.y - transform.centreY) * transform.scale,
            (point2.z) * transform.zScale,
               
            (point3.x - transform.centreX) * transform.scale, 
            (point3.y - transform.centreY) * transform.scale,
            (point3.z) * transform.zScale,
        ]);

        // specify triangles, as triplets of indexes into the vertex list.
        const arr3point = new Float32Array([ 0.0, 1.0, 2.0, ])

        // geo.vertices.push(
        // )
        geo.setAttribute( 'position', new THREE.BufferAttribute( arr9point, 3 ) );
        //Removed - This now causes WebGL errors.
        //geo.setIndex( new THREE.BufferAttribute( arr3point, 1 ) );

        //geo.faces.push(new THREE.Face3(0, 1, 2))

        const elementMesh = new THREE.Mesh( geo, elementMaterial ) ;
		elementMesh.castShadow = true;
        elementMesh.receiveShadow = true;
        elementMesh.userData = {
            objType: 'element', 
            id: id,
        }

        shapes.add(elementMesh);
	}

    function createBackPlane(point1: I3Point, point2: I3Point) {

        const width = (point2.x - point1.x)  * transform.scale
        const height = (point2.y - point1.y)  * transform.scale

        const geom = new THREE.PlaneGeometry(width, height, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {
            color: 0xffff00, 
            side: THREE.DoubleSide
        } );
        const plane = new THREE.Mesh( geom, material );

        plane.position.x = findCentre((point1.x - transform.centreX), (point2.x - transform.centreX)) * transform.scale
		plane.position.y = findCentre((point1.y - transform.centreY), (point2.y - transform.centreY)) * transform.scale
		plane.position.z = -20
        // console.log('Plane x:' + plane.position.x  + '  Plane y:' + plane.position.y )
        plane.userData = { 
            objType: 'backplane', 
            scale: transform.scale,
            width: point2.x - point1.x,
            height: point2.y - point1.y
        }

        shapes.add(plane);
	}
  
    function refreshAllSelectedElementColours(elementid: number, colour: string, colourSelected: string) {

        let material: THREE.MeshBasicMaterial

        shapes.traverse(function( element ) {

            if ( element instanceof THREE.Mesh && element.userData && element.userData.objType == 'element' ) {
                material = (element.material as THREE.MeshBasicMaterial) //Cast the base Material

                if(element.userData.id == elementid) {
                    material.color.set( colourSelected );
                    console.log(`colour element: ` + JSON.stringify( material.color));
                }
                else{
                    material.color.set( colour );
                    
                }
                element.geometry.colorsNeedUpdate = true
            }
        } );
        
	}

    function refreshAllNodes(selectedNodeID: number) {

        let material: THREE.MeshLambertMaterial
        //console.log("Refresh nodes " + selectedNodeID)

        shapes.traverse(function( node ) {
            if ( node instanceof THREE.Mesh && node.userData && node.userData.objType == 'node' ) {
                material = (node.material as THREE.MeshLambertMaterial) //Cast the base Material
                const nodeProperties = CreateLatestNodeProperties(node.userData.id)
                const {colour, userData} = nodeProperties
                //Update the node
                material.color.set( colour );     
                node.userData = userData                  
            }
        } );
	}
  
    let CreateLatestNodeProperties = (nodeid: number) => {
        const {nodeColour, nodeColourSelected, nodeColourMoveable} = latestModelProps.threeControl.content
        const mesh = latestModelProps.fe3Mesh
        let node: IFe3NodeState

        mesh.nodes && mesh.nodes.map(n => {
            if(n.id === nodeid) {
                node = n 
            }
        })

        if(!node){
            throw new Error('Node not found with ID:' + nodeid)
        }

        const {nodeRadius} = latestModelProps.threeControl.content
        const nodeRad = latestModelProps.fe3Mesh.stage > 1 ? nodeRadius : nodeRadius * 1.50 //Extra fat while adding nodes to the perimeter
        const isSelected = nodeid === latestModelProps.selNode.nodeID
        const isPerimeter = node.isBoundaryV || node.isBoundaryH
        const isMoveable = !isPerimeter && latestModelProps.moveNodeMode.on
        let colour = isMoveable ? nodeColourMoveable : nodeColour
        colour = isSelected ? nodeColourSelected : colour
        let userData = {objType: 'node', id: nodeid, height: nodeRad * 2, isPerimeter: isPerimeter, isMoveable: isMoveable}

        return {
            colour,
            isPerimeter,
            isSelected,
            isMoveable,
            userData
        }
    } 

    function purgeSubjects(){
        for (let j = shapes.children.length - 1; j >=0  ; j--) {
            const object: any = shapes.children[j];
            if ( object.geometry ) object.geometry.dispose();
            if ( object.material ) {
                if (object.material.map) object.material.map.dispose();
                object.material.dispose();
            }
            shapes.remove(object);     
        }
    }

    function setTransformParameters(props){
        const minx = 0
        const miny = 0
        const minz = 0
        const maxx = props.fe3Mesh.width
        const maxy = props.fe3Mesh.height
        const maxz = 0
        transform.centreX = findCentre(minx, maxx)
        transform.centreY = findCentre(miny, maxy)
        transform.centreZ = findCentre(minz, maxz)
        const modelmaxdim = maxx - minx > maxy - miny? maxx - minx: maxy - miny

        transform.scale = Math.round((maxDimension / modelmaxdim) * props.threeControl.content.renderScale)
        // console.log("Scale:" + transform.scale)
    }

    function setMaxDimension(width: number, height: number) {
        let smallest = lowest(width, height)
        maxDimension = smallest * 1.0
    }

	//Define camera control setup
    function degreesToRadians(deg: number) {
        return deg * (Math.PI/180);
    }

    function radiansToDegrees(rad: number) {
        return rad / (Math.PI/180);
    }

    function findCentre(p1: number, p2: number){
		return (highest(p1, p2) - (diff(p1, p2) * 0.5))
	}
 

    /**
     * Find the 3D box that encapsulates the 3 points by finding the outer boundary
     * 
     * @param p1 
     * @param p2 
     * @param p3 
     * @returns The x, y, z midpoints
     */
    function findPlaneBoundaries(p1: I3Point, p2: I3Point, p3: I3Point){
        const minx = Math.min(p1.x, p2.x, p3.x)
        const miny = Math.min(p1.y, p2.y, p3.y)
        const minz = Math.min(p1.z, p2.z, p3.z)
		const maxx = Math.max(p1.x, p2.x, p3.x) 
		const maxy = Math.max(p1.y, p2.y, p3.y)  
        const maxz = Math.max(p1.z, p2.z, p3.z) 

        //Always subtracting a positive
		const midx = maxx - (diff(maxx, minx) * 0.5)
		const midy = maxy - (diff(maxy, miny) * 0.5)
        const midz = maxz - (diff(maxz, minz) * 0.5)
        
        //console.log(`Centre3 x:${p1.x.toFixed(2)} ${p2.x.toFixed(2)} ${p3.x.toFixed(2)} mid:${midx.toFixed(2)}  y:${p1.y.toFixed(2)} ${p2.y.toFixed(2)} ${p3.y.toFixed(2)} ${midy.toFixed(2)} `)
        return {midx, midy, midz, minx, miny, minz, maxx, maxy, maxz}
	}
	
	function highest(a: number, b: number){
		return(a > b ? a: b)
	}
	
	function lowest(a: number, b: number){
		return(a < b ? a: b)
	}
	
	function diff(d1: number, d2: number)
	{
		return(d1 > d2 ? d1 - d2: d2 - d1)
	}
    
    /*
    Find the direct distance between the 2 vectors
    */
	function vectorDistance(point1: I3Point, point2: I3Point, xyScale: number, zScale: number){
		var xh = diff(point1.x, point2.x) * xyScale
		var yh = diff(point1.y, point2.y) * xyScale
		var zh = diff(point1.z, point2.z) * zScale
		var sq = (xh * xh) + (yh * yh) + (zh * zh)
		//console.log("vectorH x:" + xh + " y:" + yh + " z:" + zh + " ht:"+ sq )
		return Math.sqrt(sq)
	}
 
	function calcHyp(a: number, b: number){
        var hyp = Math.sqrt((a * a) + (b * b))
        //return  (a * b) > 0 ? hyp: (hyp * -1.00) //Invert when 1 only is negative
        return hyp
	}
 
    function calcAngle(opposite: number, adjacent: number) {
        return Math.atan2(adjacent, opposite) * 180 / Math.PI;
    } 

    /* 
    * Update the vertical and horizontal max and mins that define the perimeter.
    */
    function updatePerimeter(p: I3Point){

        //BL
        if(p.x < perimeter.blCorner.x){
            perimeter.blCorner.x = p.x
        }
        if(p.y < perimeter.blCorner.y){
            perimeter.blCorner.y = p.y
        }

        //TR
        if(p.x > perimeter.trCorner.x){
            perimeter.trCorner.x = p.x
        }
        if(p.y > perimeter.trCorner.y){
            perimeter.trCorner.y = p.y
        }
    }

    function update(time: number) {
        const angle = time//*speed;

        //group.rotation.y = angle;

        //Changed material
        //material.alphaMap.offset.y = 0.55 + time * textureOffsetSpeed;

        //To Fix !!!!!!!!!!!!!!!
        //subjectWireframe.material.color.setHSL( Math.sin(angle*2), 0.5, 0.5 );
        
        //const scale = (Math.sin(angle*8)+6.4)/5;
        //subjectWireframe.scale.set(scale, scale, scale)
    }


    return {
        update,
        onMeshChange,
        onSelectedNodeChange,
        onSelectedElementChange,
        onMoveNodesChange,
        onWindowResize
    }
}

export default SceneSubjectStaticMesh


