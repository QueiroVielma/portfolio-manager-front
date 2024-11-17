import { User } from "./user";

export class Project {
    id!:number;
    nameProject!:string;
    startDate!:Date;
    expectedEndDate!:Date;
    actualEndDate!:Date;
    budget!:number;
    description!:string;
    status!:number;
    riskProject!:number;
    members!:User[];
    responsibleManager!:number;
}
