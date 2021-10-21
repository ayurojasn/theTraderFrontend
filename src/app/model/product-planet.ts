import { Planet } from "./planet";
import { Product } from "./product";

export class ProductPlanet {

    constructor(
        public id: number,
        public product: Product,
        public planet: Planet,
    ){}
}
