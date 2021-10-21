import { Crew } from "./crew";
import { Star } from "./star";

export class Spacecraft {

    constructor(
        public id: number, 
        public craftName: string,
        public cargo: number,
        public speed: number,
    ){}
}
