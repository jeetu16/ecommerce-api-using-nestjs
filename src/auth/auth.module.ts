import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/User";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule{}