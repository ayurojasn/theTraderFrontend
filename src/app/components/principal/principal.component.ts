import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from 'src/app/model/planet';
import { Spacecraft } from 'src/app/model/spacecraft';
import { Star } from 'src/app/model/star';
import { Universe } from 'src/app/model/universe';
import { StarService } from 'src/app/shared/star.service';
import { UniverseService } from 'src/app/shared/universe.service';
import * as THREE from 'three';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  public player: number;

  public starId: number;
  planetList: Planet[] = [];
  spacecraft: Spacecraft[] = [];
  star: Star = new Star(0, "", 0, 0, 0, true, this.planetList, this.spacecraft);
  stars: Star[] = [];
  chosenStar: Star = new Star(0, "", 0, 0, 0, true, this.planetList, this.spacecraft);

  // universe: Universe[] = [];
  constructor(private universeService: UniverseService, private starService: StarService, private route: ActivatedRoute) {
    this.player = this.route.snapshot.params.player;
    this.starId = this.route.snapshot.params.starId;
  }

  ngOnInit(): void {

    
   // this.universeService.findAll().subscribe(universe => this.universe = universe);

    this.starService.findStar(this.starId).subscribe(star => this.star = star);
    this.universeService.nearbyStars(this.starId).subscribe(stars => this.stars = stars);

    //Canva background
    const getRandomParticelPos = (particleCount: number) => {
      const arr = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 10;
      }
      return arr;
    };
    const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      // resize only when necessary
      if (needResize) {
        //3rd parameter `false` to change the internal canvas size
        renderer.setSize(width, height, false);
      }
      return needResize;
    };

    // mouse
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const main = () => {
      const canvas = document.getElementById('c') as HTMLCanvasElement;
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setClearColor(new THREE.Color('#1c1624'));
      const scene = new THREE.Scene();

      // light source
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);

      // camera
      const fov = 75,
        aspect = 2,
        near = 1,
        far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;

      // Geometry
      const geometrys = [
        new THREE.BufferGeometry(),
        new THREE.BufferGeometry(),
      ];

      geometrys[0].setAttribute(
        'position',
        new THREE.BufferAttribute(getRandomParticelPos(350), 3)
      );
      geometrys[1].setAttribute(
        'position',
        new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
      );

      const loader = new THREE.TextureLoader();

      // material
      const materials = [
        new THREE.PointsMaterial({
          size: 0.05,
          map: loader.load(
            'https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png'
          ),
          transparent: true,
          // color: "#ff0000"
        }),
        new THREE.PointsMaterial({
          size: 0.075,
          map: loader.load(
            'https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png'
          ),
          transparent: true,
          // color: "#0000ff"
        }),
      ];

      const starsT1 = new THREE.Points(geometrys[0], materials[0]);
      const starsT2 = new THREE.Points(geometrys[1], materials[1]);
      scene.add(starsT1);
      scene.add(starsT2);

      const render = (time: any) => {
        // time *= 0.001; //in seconds

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          // changing the camera aspect to remove the strechy problem
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        // starsT1.position.x = mouseX * 0.0004;
        // starsT1.position.y = mouseY * -0.0004;

        // starsT2.position.x = mouseX * 0.0004;
        // starsT2.position.y = mouseY * -0.0004;
        starsT1.rotation.x = mouseY * 0.004;
        starsT1.rotation.y = mouseX * 0.004;

        starsT2.rotation.x = mouseY * 0.004;
        starsT2.rotation.y = mouseX * 0.004;

        // Re-render the scene
        renderer.render(scene, camera);
        // loop
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    };
    main();
  }
}
