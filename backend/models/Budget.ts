'use strict';
import { Optional } from "sequelize";
import { Table, Column, Model, AllowNull, BelongsToMany, Default } from "sequelize-typescript";
import User from "./User";
import UserBudget from "./UserBudget";

interface BudgetAttributes {
  id: number,
  name: string,
  amount: number,
  color: string,
  icon: string
}

export type BudgetPOJO = {
  id: number,
  name: string,
  amount: number,
  color: string,
  icon: string
}

interface BudgetCreationAttributes extends Optional<BudgetAttributes, "id"> {}

@Table({
  tableName: 'budgets'
})
export class Budget extends Model<BudgetAttributes, BudgetCreationAttributes> {
  
  @AllowNull(false)
  @Column
  public name!: string;

  @AllowNull(false)
  @Column
  public amount!: number;

  @AllowNull(false)
  @Default('none')
  @Column
  public color!: string;

  @AllowNull(false)
  @Default('AttachMoney')
  @Column
  public icon!:string

  @BelongsToMany(() => User, () => UserBudget)
  public users!: User[]

  toJSON() {
    const budget = super.toJSON() as BudgetPOJO;
    return {
      id: budget.id,
      name: budget.name,
      amount: budget.amount,
      color: budget.color,
      icon: budget.icon
    };
  }
};

export default Budget;