import { Controller, Post, UseGuards, Request, Get, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { AuthGuardJwt } from "./jwt.strategy";
import { AuthGuardLocal } from "./local.strategy";
import { User } from "./user.entity";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    @UseGuards(AuthGuardLocal)
    async login(@CurrentUser() user: User, @Request() request) {
        return {
            //userId: request.user.id,
            userId: user.id,
            token: this.authService.getTokenForUser(request.user)
        }
    }

    @Get('profile')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async getProfile(@CurrentUser() user: User, @Request() request) {
        //return request.user;
        return user;
    }
}