import * as THREE from 'three'

let GeneralLights = (scene: THREE.Scene) => {    

    const lightIn = new THREE.PointLight("#4CAF50", 30);
    const lightOut = new THREE.PointLight("#4CAF50", 10);
    lightOut.position.set(40,20,40);

    const color = 0xFFFFFF;
	const intensity = 1;
    const ambientLight = new THREE.AmbientLight(color, intensity);
    
 //   scene.add(lightIn);
 //   scene.add(lightOut);
    scene.add(ambientLight); 

    const rad = 80;

    function update(time) {
        //const x = rad * Math.sin(time*0.2)
        //lightOut.position.x = x;
    }

    return { update }
}

export default GeneralLights