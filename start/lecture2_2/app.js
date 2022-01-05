import * as THREE from "../../libs/three/three.module.js";
import { OrbitControls } from "../../libs/three/jsm/OrbitControls.js";

class App {
  constructor() {
    const container = document.createElement("div");
    document.body.appendChild(container);

    // We need a scene so we can add objects and lights
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xaaaaaa);

    // Add lighting to scene
    // ambient light does not illuminate based on location or position
    // HemisphereLight has different color for surfaces pointing down and up
    const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
    this.scene.add(ambient);
    // DirectionalLight points from its position to the origin or a target object
    const light = new THREE.DirectionalLight();
    light.position.set(0.2, 1, 1);
    this.scene.add(light);

    // Camera acts as the viewer's position and orientation in the scene
    // PerspectiveCamera means closer objects appear larger, furthur objects appear smaller
    this.camera = new THREE.PerspectiveCamera(
      60, // Field of View (DEG)
      window.innerWidth / window.innerHeight, // Aspect ratio of rendered view
      0.1, // Near clipping value, anything closer than this will be hidden
      100 // Far clipping value, anything furthur than this will be hidden
    );
    this.camera.position.set(0, 0, 4); // x (east) ➡️, y (up) ⬆️, z (south) ↙️

    // { antialias: true } is important for VR apps, otherwise apps will suffer from jagged edges
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio); // Prevent blurry graphics
    this.renderer.setSize(window.innerWidth, window.innerHeight); // Full window
    this.renderer.setAnimationLoop(this.render.bind(this)); // callback passed into setAnimationLoop is called up to 60 times/sec
    // When a render is created, it creates a <canvas/> DOM element
    container.appendChild(this.renderer.domElement);

    // Add an object
    const geometry = new THREE.BoxBufferGeometry(); // 1 unit wide, high, deep
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material); // an object is usually a mesh instance
    this.scene.add(this.mesh);

    // Allow user to interact with the camera
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener("resize", this.resize.bind(this), {
      passive: true,
    });
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // render runs 60 times/sec
  render() {
    console.log("render called");
    // Anything we want to move/change while the app is running has to be in this animation loop
    this.mesh.rotateY(0.01);
    this.mesh.rotateX(0.01);
    this.renderer.render(this.scene, this.camera);
  }
}

export { App };
