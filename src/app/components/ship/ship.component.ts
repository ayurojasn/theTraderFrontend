import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
})
export class ShipComponent implements OnInit {

  public player: number;
  public star: number;
  constructor(private route: ActivatedRoute) {
    this.star = this.route.snapshot.params.star;
    this.player = this.route.snapshot.params.player;
  }

  ngOnInit(): void {
    
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane,
      renderer: THREE.WebGLRenderer,
      container,
      rocket: THREE.Object3D<THREE.Event> | THREE.Group,
      HEIGHT,
      WIDTH;

    const createScene = () => {
      HEIGHT = window.innerHeight;
      WIDTH = window.innerWidth;

      scene = new THREE.Scene();

      scene.fog = new THREE.Fog(0x5d0361, 10, 1500);

      aspectRatio = WIDTH / HEIGHT;
      fieldOfView = 60;
      nearPlane = 1;
      farPlane = 10000;
      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
      );

      camera.position.x = 0;
      camera.position.z = 500;
      camera.position.y = -10;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(WIDTH, HEIGHT);

      renderer.shadowMap.enabled = true;

      container = document.getElementById('canvas') as HTMLCanvasElement;
      container.appendChild(renderer.domElement);

      window.addEventListener('resize', handleWindowResize, false);

      let loader = new GLTFLoader();
      loader.load(
        'https://www.stivaliserna.com/assets/rocket/rocket.gltf',
        (gltf) => {
          rocket = gltf.scene;
          rocket.position.y = 50;
          scene.add(rocket);
        }
      );
    };

    const handleWindowResize = () => {
      HEIGHT = window.innerHeight;
      WIDTH = window.innerWidth;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    };

    const createLights = () => {
      const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 1);

      const directionalLight = new THREE.DirectionalLight(0xdfebff, 1);
      directionalLight.position.set(-300, 0, 600);

      const pointLight = new THREE.PointLight(0xa11148, 2, 1000, 2);
      pointLight.position.set(200, -100, 50);

      scene.add(ambientLight, directionalLight, pointLight);
    };

    const targetRocketPosition = 40;
    const animationDuration = 2000;

    const loop = () => {
      const t = (Date.now() % animationDuration) / animationDuration;

      renderer.render(scene, camera);

      const delta = targetRocketPosition * Math.sin(Math.PI * 2 * t);
      if (rocket) {
        rocket.rotation.y += 0.1;
        rocket.position.y = delta;
      }

      requestAnimationFrame(loop);
    };

    const main = () => {
      createScene();
      createLights();

      renderer.render(scene, camera);
      loop();
    };

    main();
  }
}
