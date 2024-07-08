import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthpayloadDto } from "../dto/auth.dto";

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${process.env.SECRET_KEY}`
        })
    }
    async validate(payload: AuthpayloadDto) {
        console.log('Inside validate jwt strategy');
        console.log(payload);
        return payload;
    }
    // async validate(payload: any) {
    //     return {
    //         _id: payload._id,
    //         email: payload.email,

    //     };
    // }
}
