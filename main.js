import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let theta = 0.0;
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(20, 0, 170);

const moonTexture = new THREE.TextureLoader().load("/moontex.jpg");

const moonMap = new THREE.TextureLoader().load("/moonMap.jpg");
const geometry = new THREE.SphereGeometry(3);
const material = new THREE.MeshStandardMaterial({
  map: moonTexture,
  normalMap: moonMap,
});
const moon = new THREE.Mesh(geometry, material);
moon.position.set(25, 10, 10);
scene.add(moon);

function addStar() {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.05),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, -10 * z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);

const earthMaterial = new THREE.TextureLoader().load("/earthmaterial.jpg");
const earthTexture = new THREE.TextureLoader().load("/earth-normalmap.jpg");
const earthGeo = new THREE.SphereGeometry(15);
const earthMat = new THREE.MeshStandardMaterial({
  map: earthMaterial,
  normalMap: earthTexture,
});
const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);

const sunMap = new THREE.TextureLoader().load("/sun.jpg");
const solarTexture = new THREE.TextureLoader().load("/solartexture.jpg");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20),
  new THREE.MeshBasicMaterial({ map: sunMap })
);
sun.position.set(-50, 0, 70);
const sunlight = new THREE.PointLight(0xedd59e, 30000);
sunlight.position.set(-20, 0, 70);

scene.add(sunlight);
scene.add(sun);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//animate function to render each frame, keep new objects code above this
function animate() {
  requestAnimationFrame(animate);
  theta += 0.003;
  moon.position.set(25 * Math.cos(theta), 5, 25 * Math.sin(theta));
  moon.rotation.y += 0.001;
  earth.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
animate();

//update window size on change
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
