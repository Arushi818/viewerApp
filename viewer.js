import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from './three.js-master/build/three.module.js';
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";

//setting scene
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x88d5ff);

let scale = 1; 

//loading model
//Note: If there are issues with the texture and colour of the apollo model display, replace the model link by the link below and make the
//changes as commented below
//link to new model: Assets/uploads_files_3998079_burger_2.glb
const loader = new GLTFLoader();
loader.load('Assets/apollo_exterior-150k-4096.gltf', function(gltf){ //change gltf to glb after changing link to model in case of display issues
    console.log(gltf); //change gltf to glb after changing link to model in case of display issues
    const root = gltf.scene; //change gltf to glb after changing link to model in case of display issues
    root.scale.set(0.05, 0.05, 0.05);
    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + "% loaded");
}, function (error){
    console.log("An error occurred");
});

//skeleton code for  three.js
const ambient_light = new THREE.AmbientLight(0x404040,20);
scene.add(ambient_light);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(0, 5, 5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 15;
camera.position.z = 25;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

const OrbitControl = new OrbitControls(camera, renderer.domElement); //to allow for interaction with cursor

//functions to zoom in and out model, used for the zoom buttons
window.zoomIn = function() {
    scale *= 1.1;
    scene.children[3].scale.set(scale, scale, scale); 
}

window.zoomOut = function() {
    scale *= 0.9;
    scene.children[3].scale.set(scale, scale, scale);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    OrbitControl;
}

animate();
