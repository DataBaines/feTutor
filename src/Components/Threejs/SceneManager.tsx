import * as THREE from "three";
// import SceneSubject from './SceneSubject';
import GeneralLights from "./GeneralLights";
import SceneSubjectStaticMesh from "./SceneSubjectModelMesh";
import { modelUpdateSuccess } from "src/Actions";
import THREE_COLOURS from "./ThreeColours";
import boundaryR from "src/Reducers/BoundaryR";
import { ILinkbarUserData } from "src/Interfaces/IModel";

// import fs from 'fs-es6'

/*************************************************
 * Combine the lights, Camera, Scene and Model
 *************************************************/
const SceneManager = (
  canvas,
  addNodeRequest,
  selectNode,
  selectElement,
  addLogEntry,
  moveNode,
  modelProps
) => {
  const clock = new THREE.Clock();
  const origin = new THREE.Vector3(0, 0, 0);

  // set the scene size
  const WIDTH = 800,
    HEIGHT = 600;

  // set some camera attributes
  const VIEW_ANGLE = 75,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 8000;

  const canvasClientDimensions = {
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  };

  const scene = buildScene();
  const renderer = buildRender(canvasClientDimensions);
  const camera = buildCamera(canvasClientDimensions);
  //const sceneSubjects = createSceneSubjects(scene);
  const lights = GeneralLights(scene);
  const sceneSubjectModelMesh = SceneSubjectStaticMesh(scene, modelProps);

  const sceneSubjects = [lights, sceneSubjectModelMesh];
  const raycaster = new THREE.Raycaster();

  function buildScene() {
    const scene1 = new THREE.Scene();
    scene1.background = new THREE.Color(THREE_COLOURS.SCENE_BACKGROUND);

    return scene1;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    //renderer.setClearColor(0x140b33, 1) //Added
    //TODO fix missing property
    //renderer.gammaInput = true;
    //renderer.gammaOutput = true;

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 75;
    const nearPlane = 1;
    const farPlane = 8000;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    camera.position.z = 450;
    camera.position.x = 0;
    camera.position.y = 50;

    return camera;
  }

  // function createSceneSubjects(scene: THREE.Scene) {

  //     const lights = GeneralLights(scene)
  //     const sceneSubject = SceneSubjectStaticMesh(scene, modelProps)

  //     const sceneSubjects = [
  //         lights,
  //         sceneSubject
  //     ]
  //     return sceneSubjects;
  // }

  const mouseStatus = {
    x: 0,
    y: 0,
    startMouseX: 0,
    startMouseY: 0,
    rot: Math.PI / 4,
    mouseDown: false,
    nodeToMove: -1,
  };

  const ndcMouse = {
    x: 0,
    y: 0,
  };

  function onMouseMove(x: number, y: number) {
    if (mouseStatus.mouseDown && mouseStatus.nodeToMove < 0) {
      var dx = x - mouseStatus.startMouseX;
      var dy = y - mouseStatus.startMouseY;
      mouseStatus.rot += dx * 0.005;
      camera.position.x = Math.cos(mouseStatus.rot) * 500;
      camera.position.z = Math.sin(mouseStatus.rot) * 500;
      //Maximum vertical position is 50 units
      camera.position.y = Math.max(-50, camera.position.y + dy);
      mouseStatus.startMouseX += dx;
      mouseStatus.startMouseY += dy;
    }
  }

  function onMouseDown(x: number, y: number) {
    mouseStatus.mouseDown = true;
    mouseStatus.startMouseX = x;
    mouseStatus.startMouseY = y;
    mouseStatus.nodeToMove = -1;

    if (modelProps.fe3Mesh.stage > 1) {
      let intersects = FindRaycasterIntersections(x, y);

      for (let i = 0; i < intersects.length; i++) {
        let clickedObj = intersects[i].object;

        if (
          clickedObj.userData.objType == "node" &&
          clickedObj.userData.isMoveable
        ) {
          mouseStatus.nodeToMove = clickedObj.userData.id;
        }
      }
    }
  }

  function onMouseUp(x: number, y: number) {
    mouseStatus.mouseDown = false;

    //Check for a >3 pixel move in any direction
    let clickedObj: any;
    // let dx = x - mouseStatus.startMouseX;
    // let dy = y - mouseStatus.startMouseY;

    let intersects = FindRaycasterIntersections(x, y);

    for (let i = 0; i < intersects.length; i++) {
      // for ( let i = intersects.length-1; i >= 0; i-- ) {
      clickedObj = intersects[i].object;

      const res = {
        type: clickedObj.userData.objType,
        id: clickedObj.userData.id,
        uvx: ThreeSF(intersects[i]?.uv?.x || 0),
        uvy: ThreeSF(intersects[i]?.uv?.y || 0),
        pointx: ThreeSF(intersects[i].point.x),
        pointy: ThreeSF(intersects[i].point.y),
        pointz: ThreeSF(intersects[i].point.z),
        objpos: clickedObj.position,
        objrot: clickedObj.rotation,
        distanceCentre: ThreeSF(
          clickedObj.position.distanceTo(intersects[i].point)
        ),
      };
      console.log(res);
      //addLogEntry(JSON.stringify(res))

      if (clickedObj.userData.objType == "linkbar") {
        if (modelProps.fe3Mesh.stage === 1) {
          // Get x, y or undefined
          let boundaryAxis = getAxis(
            clickedObj.userData.isBoundaryV,
            clickedObj.userData.isBoundaryH
          );

          if (boundaryAxis) {
            let ud: ILinkbarUserData;
            ud = clickedObj.userData;
            // let posClicked = clickedObj.userData.originOffset + ( clickedObj.userData.height * (1.00 - intersects[ i ].uv.y))
            let scaledPos =
              (ud.height * (1.0 - intersects[i].uv.y)) / ud.xyScale;
            let posClicked = ud.originOffset + scaledPos;

            //console.log(`Pos clicked: ${posClicked.toString()}`)
            addNodeRequest(boundaryAxis, posClicked);
          }
        }
      }

      if (
        clickedObj.userData.objType == "backplane" &&
        !clickedObj.userData.isPerimeter
      ) {
        console.log(`backplane hit!!! ${mouseStatus.nodeToMove}`);

        if (mouseStatus.nodeToMove >= 0) {
          const nodeNewPosX = clickedObj.userData.width * intersects[i].uv.x;
          const nodeNewPosY = clickedObj.userData.height * intersects[i].uv.y;
          moveNode(mouseStatus.nodeToMove, nodeNewPosX, nodeNewPosY);
          mouseStatus.nodeToMove = -1;
        }
      }

      if (clickedObj.userData.objType == "node") {
        //clickedObj.material.color.set( THREE_COLOURS.NODE_SELECTED ) //Set the selected node colour, better to let state do this
        selectNode(clickedObj.userData.id);
        return;
      }

      if (
        clickedObj.userData.objType == "element" &&
        mouseStatus.nodeToMove < 1
      ) {
        //clickedObj.material.color.set( THREE_COLOURS.NODE_SELECTED ) //Set the selected node colour, better to let state do this
        selectElement(clickedObj.userData.id);
      }
    }
  }

  function FindRaycasterIntersections(x: number, y: number) {
    // for Raycaster to look for click objects, where is the canvas within the webpage?
    const rect = canvas.getBoundingClientRect();
    const x1 = ((x - rect.left) * canvas.width) / rect.width;
    const y1 = ((y - rect.top) * canvas.height) / rect.height;
    //Calibrate to range -1.00 to +1.00 on both axes
    const vx = (x1 / canvas.width) * 2 - 1;
    const vy = -(y1 / canvas.height) * 2 + 1;

    const a = new THREE.Vector2(vx, vy);
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(a, camera);

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects(scene.children, true);
    return intersects;
  }

  // function writeToFile(object1) {
  //     fs.writeFile('./feLog.json', JSON.stringify(object1, null, 2),'utf8', null )
  // }

  function ThreeSF(val1: number) {
    return Number(val1.toPrecision(3));
  }

  function getAxis(isBV, isBH) {
    if (isBH) return "x";
    else if (isBV) return "y";
    else return undefined;
  }

  function update() {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < sceneSubjects.length; i++)
      sceneSubjects[i].update(elapsedTime);

    //updateCameraPositionRelativeToMouse();
    //setupMouseCamera()
    camera.lookAt(scene.position);
    //camera.lookAt(5, 5, 5) //slightly off the origin

    renderer.render(scene, camera);
  }

  // function updateCameraPositionRelativeToMouse() {
  //     camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
  //     camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
  //     camera.lookAt(origin);
  // }

  // cascade model changes to the UI.
  function onWindowResize() {
    const { width, height } = canvas;

    canvasClientDimensions.width = width;
    canvasClientDimensions.height = height;
    console.log("resize width:" + width + " height:" + height);

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    sceneSubjectModelMesh.onWindowResize(width, height);
  }

  // function onPropChange(newModelProps) {
  //     modelProps = newModelProps
  //     sceneSubjectModelMesh.onPropChange(newModelProps)
  // }

  function onMeshChange(newModelProps) {
    modelProps = newModelProps;
    console.log("Mesh change");
    sceneSubjectModelMesh.onMeshChange(newModelProps);
  }

  function onSelectedNodeChange(newModelProps) {
    modelProps = newModelProps;
    sceneSubjectModelMesh.onSelectedNodeChange(newModelProps);
  }

  function onSelectedElementChange(newModelProps) {
    modelProps = newModelProps;
    sceneSubjectModelMesh.onSelectedElementChange(newModelProps);
  }

  function onMoveNodesChange(newModelProps) {
    modelProps = newModelProps;
    sceneSubjectModelMesh.onMoveNodesChange(newModelProps);
  }

  //expose event methods that can be called from model changes to the UI.
  return {
    update,
    onWindowResize,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    // onPropChange,
    onMeshChange,
    onSelectedNodeChange,
    onSelectedElementChange,
    onMoveNodesChange,
  };

  //Function not needed!!!!!!!!!!!!!!
  function findClickedCylinderYPosition(
    clickedCylinder: THREE.Object3D,
    clickPoint
  ) {
    let pivotGroup = new THREE.Group();
    pivotGroup.position.set(
      clickedCylinder.position.x,
      clickedCylinder.position.y,
      clickedCylinder.position.z
    );
    let clickObj3D = new THREE.Object3D();
    clickObj3D.position.set(clickPoint.x, clickPoint.y, clickPoint.z);
    pivotGroup.add(clickObj3D);

    pivotGroup.rotateX(clickedCylinder.rotation.x * -1);
    pivotGroup.rotateZ(clickedCylinder.rotation.z * -1);
    let clickWorldPosition = new THREE.Vector3();
    clickObj3D.getWorldPosition(clickWorldPosition);
    let yDistance = pivotGroup.position.y - clickWorldPosition.y;
    let yCylHeight = clickedCylinder.userData.height;
    let pos = (yCylHeight / 2 + yDistance) / yCylHeight;
    console.log(
      "clicked Cyl position:" +
        yDistance +
        " height:" +
        yCylHeight +
        " pos: " +
        pos
    );
    return pos;
  }
};

export default SceneManager;
