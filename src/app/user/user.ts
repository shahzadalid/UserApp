export interface IUser{
    id:number,
    name:string,
    designation:string,
    skills:string
}

export class User{
    constructor(
    public id:number,
    public name:string,
    public dob:string,
    public designation:string,
    public skills:number){}
}