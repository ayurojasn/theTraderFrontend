import { Star } from "./star";

export class Universe {

    constructor(
        public id: number,
        public stars: Star[],
        public nodes: number,
        public edges: number
        
    ){}
}
