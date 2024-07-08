import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }
    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password)
        console.log('this is local strategy')
        console.log(`strategy show email: ${email}`)
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}