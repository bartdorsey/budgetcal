import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import User from './User.js';

@Entity()
export default class Budget {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ nullable: false })
    public name!: string;

    @Column({ nullable: false })
    public amount!: number

    @Column({ nullable: false, default: 'AttachMoney' })
    public icon!:string

    @Column({ nullable: false, default: 'none' })
    public color!:string   

    @ManyToMany(() => User, user => user.budgets)
    public users!: User[]
}
