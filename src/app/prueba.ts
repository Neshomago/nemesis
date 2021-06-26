import { stringify } from "@angular/compiler/src/util";

export class Prueba {
    FechaIngreso:Date;
    constructor(
        public Cantidad:number,
        public Priority:string
    ){this.FechaIngreso = new Date();}
}
