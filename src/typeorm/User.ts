import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn( {
        type:'bigint'
    })
    id : number;

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
        nullable:false,
        type:'bigint',
        default:false
    })
    phone: number

    @Column({
        nullable: false,
        default: ""
    })
    password: string

}

