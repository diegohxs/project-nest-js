import { Repository, EntityRepository, Unique } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credencials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bycrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDto : AuthCredentialsDto): Promise<void>{
        const {username, password} = authCredentialsDto;
        /*
        const exist = this.findOne({ username});

        if (exist){ // throw some error}

*/
        const salt = await bycrypt.genSalt();
       
        const user = new User();
        user.username = username;
        user.salt = await bycrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);
        
        
        try{
            await user.save();
        }catch(error){
           if(error.code === '23505'){// duplicate user name
            throw new ConflictException('Username already exists');        
            }else{
                throw new InternalServerErrorException();
            }
        }   

    }

    async validateUserPassword(authCredentialsDto : AuthCredentialsDto): Promise<string>{
        const {username, password } = authCredentialsDto;
        const user = await this.findOne( {username });

        if(user && await user.validatePassoword(password)){
            return user.username;
        }else{
            return null;
        }


    }

    private async hashPassword(password : string , salt : string ): Promise<string>{
        return bycrypt.hash(password,salt)
    }

}