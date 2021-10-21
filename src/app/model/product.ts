export class Product {

    constructor(
        public id: number,
        public productName: string,
        public volume: number,
        public stock: number,
        public demand: number,
        public supply: number,
        public pv: number,
        public b_pv: boolean,
        public pc: number,
        public b_pc: boolean
    ){}
}
