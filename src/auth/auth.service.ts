import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';




@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,) { }

    async validateUser(email: string, pass: string) {
        const user = await this.userService.findOnebyEmail(email);
        const passwordMatch = await bcrypt.compare(pass, user.password);
        if (!user && !passwordMatch) {
            throw new HttpException('Password or Email incorrected', HttpStatus.UNAUTHORIZED)
        };

        // generated jwt token
        const token = await this.jwtService.signAsync({ userId: user.id });
        if (!token) {
            throw new BadRequestException('Invalid email or password')
        }
        return {
            access_token: token,
            token_type: 'bearer'
        };
        // const { password, ...result } = user;
        // return {
        //     //user,
        //     result,
        //     // access_token: this.jwtService.sign(result),
        //     // token_type: 'Bearer'
        // };

    }
    // async login(user: any) {
    //     // const payload = { email: user.email, password: user.userId };
    //     return {
    //         access_token: this.jwtService.sign({ userId: user.id }),
    //     };
    //     // async login(user: any) {
    //     //     const payload = {
    //     //         _id: user._id,
    //     //         email: user.email

    //     //     };
    //     // return {
    //     //     access_token: this.jwtService.sign(payload),
    //     // };
    // }



}
