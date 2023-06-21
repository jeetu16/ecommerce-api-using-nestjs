import { Exclude } from "class-transformer"

export class SerializedUser {
    id: number
    firstName: string
    lastName: string
    email: string

    @Exclude()
    password: string

    @Exclude()
    role: string

    // constructor(partial : Partial<SerializedUser>) {
    //     Object.assign(this,partial);
    // }
} 