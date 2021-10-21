import { Crew } from "./crew";

export class Player {

    constructor(
        public id: number,
        public playerName: string,
        public role: string,
        public crew: Crew
    ){}
}
