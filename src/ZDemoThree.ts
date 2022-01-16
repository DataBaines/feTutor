// add styles
//import './style.css'
// three.js
import * as THREE from 'three'
import * as REACT from 'react'
import * as REACTDOM from 'react-dom'

//Stats addon
import Stats from './stats.js'
let stats = Stats()
document.body.appendChild( stats.dom );

//Import a local class from a file
//import {Greeter} from './FeModel/feNode'
//Instantiate the class
// let greeter = new Greeter()
// document.body.innerHTML = greeter.greet()

//var stats = new STATS()
// create the scene
let scene = new THREE.Scene()

// create the camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

let renderer = new THREE.WebGLRenderer()

// set size
renderer.setSize(window.innerWidth, window.innerHeight)

// add canvas to dom
document.body.appendChild(renderer.domElement)

// add axis to the scene
let axis = new THREE.AxesHelper(10)

scene.add(axis)

// add lights
let light = new THREE.DirectionalLight(0xffffff, 1.0)
light.position.set(100, 100, 100)
scene.add(light)

let light2 = new THREE.DirectionalLight(0xffffff, 1.0)
light2.position.set(-100, 100, -100)
scene.add(light2)

let material = new THREE.MeshBasicMaterial({
	color: 0xaaaaaa,
	wireframe: true
})

// create a box and add it to the scene
let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)

createSpheres() //Added bit!!!!!!!!!!!!!!!!!!!!!!!!!
scene.add(box)

box.position.x = 0.5
box.rotation.y = 0.5
WritePos("box", box.position.x, box.position.y, box.position.z)

camera.position.x = 10
camera.position.y = 10
camera.position.z = 5
WritePos("camera", camera.position.x, camera.position.y, camera.position.z)

camera.lookAt(scene.position)

function animate(): void {
	stats.begin()
	requestAnimationFrame(animate)
	render()
	stats.end()
}

function render(): void {
	let timer = 0.002 * Date.now()
	box.position.y = 0.5 + 0.5 * Math.sin(timer)
	box.rotation.x += 0.1
	renderer.render(scene, camera)
}

var spheres:THREE.Object3D
var distance:number
distance=1


function createSpheres() {
	//create empty 3d object — group for future spheres
	spheres = new THREE.Object3D();
	//randomly create 80 spheres by loop
		for (var i = 0; i < 10; i++) {
			///var sphere = new THREE.SphereGeometry(2, Math.random() * 3, Math.random() * 3);
			var sphere = new THREE.SphereGeometry(.02, Math.random() * .03, Math.random() * .03);
			var material = new THREE.MeshPhongMaterial({
				color: Math.random() * 0xff00000 - 0xff00000,
				//shading: THREE.FlatShading,
			})
	
			//creating the mesh and add primitive and material
			var particle = new THREE.Mesh(sphere, material);
			//randomly set position and scale
			distance = 1;
			particle.position.x = Math.random() * distance * 10;
			particle.position.y = Math.random() * -distance * 6;
			particle.position.z = Math.random() * distance * 4;
			particle.rotation.y = Math.random() * 2 * Math.PI;
			particle.scale.x = particle.scale.y = particle.scale.z = Math.random() * 12 + 5;
			//add particle to the spheres group
			WritePos("particle", particle.position.x, particle.position.y, particle.position.z)
			spheres.add(particle);
		}

		//correct spheres position relative to the camera
		spheres.position.y = 0.5;//500;
		spheres.position.x = 1;//-2000;
		spheres.position.z = 0.5;//-100;
		spheres.rotation.y = Math.PI * 600;
		//add spheres to the scene
		WritePos("sphere", spheres.position.x, spheres.position.y, spheres.position.z)
		scene.add(spheres);

	}

function WritePos(name: string, x: number, y: number, z: number){
	console.log("Position of "+ name +" is x:" + x.toString() + " y:" + y.toString() + " z:" + z.toString())
}
animate()
