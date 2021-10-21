import { Star } from "./star";

export class Universe {

    constructor(
        public id: number,
        public universe: Star[],
        public adjancyList: Array<Array<number>>,
        public nodes: number,
        public edges: number
        
    ){}
}
