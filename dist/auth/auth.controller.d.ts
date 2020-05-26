import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credencials.dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    test(user: User): void;
}
