import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn( {
        type:'bigint'
    })
    user_id : number;

    @Column({
        nullable:false,
        default:""
    })
    firstName: string;

    @Column()
    lastName: string

    @Column({
        nullable: false,
        default: ""
    })
    email: string

    @Column({
        nullable:false,
        default: "CUSTOMER"
    })
    role: string


    @Column({
        nullable: false,
        default: ""
    })
    password: string

    @Column({
        nullable:false
    })
    phone: number

}

