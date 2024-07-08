import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { Public } from '../auth/decorator/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) { }
    // register
    @Public()
    @Post('create')
    @UsePipes(new ValidationPipe())
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);
        // delete user.password
        return user;
    }
    // login
    @Public()
    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req: Request) {
        console.log(`test req user ${req.user}`)
        return req.user;
    }
    // @Get('/')// for testing  // if need token 
    // status(@Req() req: Request) {
    //     console.log('Inside Authcontroller status method')
    //     console.log(req.user);
    //     return req.user;
    // }
    // test route
    @Get('me')
    me() {
        return 'ok';
    }
}
