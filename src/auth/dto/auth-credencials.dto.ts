import { IsString, MinLength, MaxLength, Matches } from "class-validator";



export class AuthCredentialsDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
    {message : ' password too weak'},)
    password: string;
}