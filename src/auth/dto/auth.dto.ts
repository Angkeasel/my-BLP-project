import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/user/dto/create-user.dto";

// export class AuthpayloadDto extends PickType(CreateUserDto, ['email', 'password']) {


// }

export class AuthpayloadDto {
    email: string;
    password: string;
}