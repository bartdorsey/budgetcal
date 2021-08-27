import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import Budget from './Budget.js'
import { IsEmail } from 'class-validator';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ nullable: false, unique: true })
    public username!: string;

    @Column({ nullable: false, unique: true })
    @IsEmail()
    public email!: string

    @Column({ nullable: false })
    public hashedPassword!: string

    @ManyToMany(() => Budget, budget => budget.users)
    @JoinTable()
    public budgets!: Budget[]
}
