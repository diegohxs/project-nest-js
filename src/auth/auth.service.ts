import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credencials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService: JwtService,
    ){}

   async signUp(authCredentialsDto : AuthCredentialsDto){
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentials : AuthCredentialsDto) : Promise<{accessToken : string}>{
        const username = await this.userRepository.validateUserPassword(authCredentials);

        if (!username){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload =  {username };
        const accessToken = await this.jwtService.sign(payload);

    return {accessToken};

     }

}
