import { Controller, Post, Injectable, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credencials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './jwt/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private authService : AuthService,
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto){
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken : string}>{
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user : User){
        console.log(user);
    }



}
