import { HttpCode, HttpException, HttpStatus, Injectable, Req } from "@nestjs/common";
import { SerializedUser } from "./model/User";
import { plainToClass } from 'class-transformer';
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "src/typeorm/User";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/Update.User.dto";


@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    // Get all the user details
    async getAllUsers() {
        const users = (await this.userRepository.find()).map(user => plainToClass(SerializedUser, user));
        return users;
    }

    // get specific user details
    async findUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) return plainToClass(SerializedUser, user)
        else throw new HttpException("Not found any user", HttpStatus.NOT_FOUND)
    }

    // delete user
    async deleteUser(id: number) {
        if (!id) {
            throw new HttpException("Please Provide id", HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
        }
        await this.userRepository.delete(id);
        return {
            message: "Successfully deleted",
            user: plainToClass(SerializedUser, user)
        }
    }

    // update user
    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        if (!id) {
            throw new HttpException("Please Provide id", HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.findOne({ where: { id } });
        console.log(user)
        if (!user) {
            throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
        }
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOne({ where: { id } });

        return {
            message: "successfully updated user",
            updatedUser: plainToClass(SerializedUser, updatedUser)
        }
    }
}