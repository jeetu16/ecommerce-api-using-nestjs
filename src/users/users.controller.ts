import { Controller, Get, Param, ParseIntPipe, Body,  Delete, Patch, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/Update.User.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/AuthGuard";
import { RoleBasedGuard } from "src/guards/RoleBasedGuard";



@ApiTags('users')
@ApiSecurity('')
@UseGuards(AuthGuard)
@ApiBearerAuth('token')
@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService) { }
    
    @Get()
    @UseGuards(RoleBasedGuard)
    @ApiOperation({summary:"This api is used for getting all users details. It can only be accessed by admin"})
    @ApiResponse({
        status:201,
        description: "Successfully Getting all users details",
    })
    @ApiResponse({
        status: 400,
        description: "No authorized token",
    })
    @ApiResponse({
        status:401,
        description: "Unauthorized Access"
    })
    @ApiResponse({
        status: 403,
        description: "Don't have permission to do this"
    })
    @ApiResponse({
        status:500,
        description: "Internal Server Error"
    })
    getUsers() {
        return this.usersService.getAllUsers();
    }
    

    @Get("/search/:id")
    @ApiOperation({ summary: "This api is used for getting a particular user details" })
    @ApiParam({
        name:'id',
        type:'integer',
        required:true,
        description: "Enter user Id" 

    })
    @ApiResponse({
        status: 201,
        description: "Successfully getting a user details"
    })
    @ApiResponse({
        status: 400,
        description: "No authorized token"
    })
    @ApiResponse({
        status:401,
        description: "Unauthorized Access"
    })
    @ApiResponse({
        status:500,
        description: "Internal Server Error"
    })
    searchUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }



    @Delete('/:id')
    @ApiOperation({summary:"This api is used to delete a particular user based on id. Only admin can delete a user"})
    @ApiResponse({
        status: 400,
        description: "No authorized token"
    })
    @ApiResponse({
        status:401,
        description: "Unauthorized Access"
    })
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

    @Patch("/:id")
    updateUser(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }
}