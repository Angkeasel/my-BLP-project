import { IsNotEmpty, IsEmail, Validate, isNumber, } from "class-validator"
import { isUnique } from "src/validation/isUnique.user";

export class CreateUserDto {
    @IsNotEmpty()
    @isUnique({ tableName: 'users', column: 'username' })
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @isUnique({ tableName: 'users', column: 'email' })
    email: string;

    @IsNotEmpty()
    password: string



}


