import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { AuthGuardJwt } from "./jwt.strategy";
import { User } from "./user.entity";


@Controller('users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ){}

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() createUserDto: CreateUserDto) {
        const user = new User();
        if(createUserDto.password !==createUserDto.retypedPassword) {
            throw new BadRequestException(['Passwords are not identitcal']);
        }

        const existingUser = await this.repo.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email }
            ]
        });

        if (existingUser) {
            throw new BadRequestException(['username or email is already used']);
        }

        user.username = createUserDto.username;
        user.password = await this.authService.hashPassword(createUserDto.password);
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;

        return {
            ...(await this.repo.save(user)),
            token: this.authService.getTokenForUser(user)
        }
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuardJwt)
    async create(@Body() createUserDto: CreateUserDto) {
        const user = new User();
        if(createUserDto.password !==createUserDto.retypedPassword) {
            throw new BadRequestException(['Passwords are not identitcal']);
        }

        const existingUser = await this.repo.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email }
            ]
        });

        if (existingUser) {
            throw new BadRequestException(['username or email is already used']);
        }

        user.username = createUserDto.username;
        user.password = await this.authService.hashPassword(createUserDto.password);
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;

        return {
            ...(await this.repo.save(user)),
            token: this.authService.getTokenForUser(user)
        }
    }
}