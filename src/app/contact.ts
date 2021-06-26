// export class Contact {
//     constructor(
//         public name:string,
//         public surname:string,
//         public taxCode:string,
//         public address:string,
//         public phone:string,
//         public user:string,
//         public customerId:string,
//         public ids:string,
//         public version:number,
//         public id?:number,
//         public password?:string,
//         public RoleA?:number,
//         public RoleC?:number,
//         public RoleE?:number,
//         public RoleT?:number,
//         ){}
// }

export class Contact {
    constructor(
        public name:any,
        public surname:any,
        public taxCode:any,
        public address:any,
        public phone:any,
        public email:any,
        public customerId:any,
        public version:number,
        public id?:number,
        public userId?:number,
        ){}
}

export class UsuarioModel {
    constructor(
        public username:any,
        public password:any,
        public email:any,
        public RoleA:any,
        public RoleC:any,
        public RoleE:any,
        public RoleT:any,
        public id?:number,
    ) {}
}

export class UserFirebase {
    constructor(
        public email:any,
        public password:any,
    ) {}
}