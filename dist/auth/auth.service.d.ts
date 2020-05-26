import { UserRepository } from './repository/user.repository';
import { AuthCredentialsDto } from './dto/auth-credencials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentials: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
