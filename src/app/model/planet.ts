import { ProductPlanet } from "./product-planet";
import { Star } from "./star";

export class Planet {

    constructor(
        public id: number,
        public planetName: string,
        public star: Star,
        public productPlanetList: ProductPlanet[]
    ){}
}
