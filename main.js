import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';


// creating scene and renderer
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(2.5,2.3,2);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor(0x212121);
document.body.appendChild(renderer.domElement);

// create properties to manipulate. not working yet.
const properties = {numberofcubes : 9, length : 2, gradient : 0.22, cubesCount : 9};
var previousnumberofcubes = 9, previousgradient = 0.22;

// create gui at top-right for controlling properties paramaeters
var gui = new GUI();
const cubeFoler = gui.addFolder('CubesProperties');
cubeFoler.add(properties, 'gradient',0.1,2).listen();
//below two don't work yet.
cubeFoler.add(properties, 'cubesCount', 0, 20).step(1);
cubeFoler.add(properties, 'length', 0,20);
cubeFoler.open();

// create cube mesh for all the cubes.
const cubegeo = new THREE.BoxGeometry(1,0.2,1);
const cubematerial = new THREE.MeshStandardMaterial( { color: 0x2345ff});

//create cube array to store all cubes.
let cubeArray = [];

//store some cubes initially in the cube array and add them to the scene.
for(var i=0;i<properties.numberofcubes;i++){
  var mesh = new THREE.Mesh(cubegeo, cubematerial);
  cubeArray.push(mesh);
  // console.log(numberofcubes.numberofcubes);
  cubeArray[i].position.y += properties.gradient * i;
  scene.add(cubeArray[i]);  
} 

//create orbitalcontrols for manipulating the scene with mouse.
const controls = new OrbitControls(camera, renderer.domElement);

// add a point light to the scene
const pointlinght = new THREE.PointLight(0xffffff, 2,100);
pointlinght.position.set(1,4,2);
scene.add(pointlinght);

//light helper for adjusting point light position
// const lighthelper = new THREE.PointLightHelper(pointlinght,1,0xffffff);
// scene.add(lighthelper);

// create ground 
const groundgeo= new THREE.BoxGeometry(15,0.1,15);
const groundmaterial = new THREE.MeshStandardMaterial( { color: 0x2345ff});
const ground = new THREE.Mesh(groundgeo, groundmaterial);
ground.position.y = -0.15;
scene.add(ground);

// function that takes care of rotating the cubes per frame.
function rotatecubes(){
  for(var i=0;i<properties.numberofcubes;i++){
    // calculatenumberofcubes();
    cubeArray[i].rotation.y += 0.01 * properties.gradient * i;
  }
}


//animate function
function animate() {
  requestAnimationFrame(animate);
  rotatecubes();
  controls.update();
  renderer.render(scene, camera);
}

animate();



// fucntion for adding and removing cubes. buggy. wip.
// function addnremove() {
//    if(previousnumberofcubes > properties.numberofcubes){
//     for(var i=properties.numberofcubes;i<previousnumberofcubes;i++){
//     scene.remove(cubeArray[i]);
     
//     console.log(previousnumberofcubes - properties.numberofcubes);
//     }
//     cubeArray.splice(properties.numberofcubes,previousnumberofcubes - properties.numberofcubes);
//    }else if(previousnumberofcubes == properties.numberofcubes){
//      return;
//    }
//    else{
//      for(var i=previousnumberofcubes;i<properties.numberofcubes;i++){
//        console.log( properties.numberofcubes - previousnumberofcubes)
//        var mesh = new THREE.Mesh(cubegeo, cubematerial);
//        cubeArray.push(mesh);
//         scene.add(cubeArray[i-1]);
//         cubeArray[i].position.y += properties.gradient *i;
//         console.log("cube array length : " + cubeArray.length); 
//      }
//    }
//    console.log("previous number of cubes : " + previousnumberofcubes + ", current number of cubes : " + properties.numberofcubes);
   
//    previousnumberofcubes = properties.numberofcubes;
// }