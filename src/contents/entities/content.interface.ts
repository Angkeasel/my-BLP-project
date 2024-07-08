import { UserEntity } from "src/user/entities/user.entity";


export interface ContentInterface {
    id?: number;
    title?: string;
    image?: string;
    audio?: string; // fix more
    createdAt?: Date;
    updatedAt?: Date;
    user?: UserEntity;
}