import { ContentEntity } from "src/contents/entities/content.entity";

export interface UserInterface {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    gender?: string;
    dateOfBirth?: Date;
    profileImage?: string;
    // role?: UserRole;
    contents?: Array<ContentEntity>

}