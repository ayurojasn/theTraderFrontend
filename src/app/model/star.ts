import { Planet } from "./planet";
import { Spacecraft } from "./spacecraft";

export class Star {

    constructor(
        public id: number,
        public starName: string,
        public x: number,
        public y: number,
        public z: number,
        public inhabited: boolean,

        public planetList: Planet[],

        public spaceStarList: Spacecraft

    ){}
}
