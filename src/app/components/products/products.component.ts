import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from 'src/app/model/planet';
import { Product } from 'src/app/model/product';
import { ProductCrew } from 'src/app/model/product-crew';
import { ProductPlanet } from 'src/app/model/product-planet';
import { Spacecraft } from 'src/app/model/spacecraft';
import { Star } from 'src/app/model/star';
import { Crew } from 'src/app/model/crew';
import { CrewService } from 'src/app/shared/crew.service';
import { PlanetsService } from 'src/app/shared/planets.service';
import { PlayerService } from 'src/app/shared/player.service';
import { ProductsService } from 'src/app/shared/products.service';
import { StarService } from 'src/app/shared/star.service';
import * as THREE from 'three';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public player: number;
  public star: number;
  public planet: number;
  public crewPlayerId: number = 1;
  spacecraftList: Spacecraft[] = [];
  planetList: Planet[] = [];

  productPlanetList: ProductPlanet[] = [];
  starP: Star = new Star(0, "", 0, 0, 0, true, this.planetList, this.spacecraftList);

  planetP: Planet = new Planet(0, "", this.starP, this.productPlanetList);

  producto: Product = new Product(0,"",0,0,0,0,0,true,0,true);
  products: ProductPlanet[] = [];

  crewProducts: ProductCrew[] = [];

  spacecraft: Spacecraft = new Spacecraft(0, "", 0, 0);
  crew: Crew = new Crew(0, "", 0, 0, this.spacecraft, this.crewProducts);
  public chosenProduct: ProductPlanet = new ProductPlanet(0, this.producto, this.planetP);

  public chosenCrewProduct: ProductCrew = new ProductCrew(0, this.producto);

  constructor(private productsService: ProductsService, private planetsService: PlanetsService, private crewService: CrewService, private playerService: PlayerService, private route: ActivatedRoute) { 
    this.star = this.route.snapshot.params.star;
    this.player = this.route.snapshot.params.player;
    this.planet = this.route.snapshot.params.planet;
  }

  ngOnInit(): void {

    this.productsService.getProductPlanet(this.planet).subscribe(products => this.products = products);

    this.playerService.getCrewPlayer(this.player).subscribe( crewPlayerId => {
      this.crewPlayerId = crewPlayerId; 
      this.crewService.getCrew(this.crewPlayerId).subscribe(crew => this.crew = crew);
      console.log(this.crew);
      this.crewService.getProductCrew(this.crewPlayerId).subscribe(crewProducts => this.crewProducts = crewProducts);

    });

   
    
    this.planetsService.findPlanet(this.planet).subscribe(planetP => this.planetP = planetP);



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
