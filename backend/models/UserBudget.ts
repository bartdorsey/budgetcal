import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Budget from "./Budget";
import User from "./User";

@Table({
    tableName: 'user_budget'
})
export class UserBudget extends Model {
    @ForeignKey(() => User)
    @Column
    public userId!: number

    @ForeignKey(() => Budget)
    @Column
    public budgetId!: number
}

export default UserBudget;

