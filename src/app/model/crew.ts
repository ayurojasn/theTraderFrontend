import { Player } from "./player";
import { ProductCrew } from "./product-crew";
import { Spacecraft } from "./spacecraft";

export class Crew {
    
    constructor(
        public id: number,
        public crewName: string,
        public credits: number,
        public totalTime: number,
        public spacecraft: Spacecraft,
        public productCrewList: ProductCrew[]
        
    ){}
}
