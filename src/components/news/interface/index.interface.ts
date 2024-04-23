import { ObjectId} from "mongoose";

export interface INews {
    user:ObjectId,
    title:string,
    description:string,
    image:string,
    enlace:string,
    date:string,
}