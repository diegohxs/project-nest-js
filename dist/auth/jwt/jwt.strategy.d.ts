import { Strategy } from 'passport-jwt';
import { UserRepository } from '../repository/user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../entities/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
