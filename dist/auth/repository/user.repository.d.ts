import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credencials.dto';
export declare class UserRepository extends Repository<User> {
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>;
    private hashPassword;
}
