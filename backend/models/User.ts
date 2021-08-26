'use strict';
import { Optional } from 'sequelize'
import { Table, Column, Model, AllowNull, Unique, BelongsToMany } from "sequelize-typescript";
import Budget from './Budget';
import UserBudget from './UserBudget';

interface UserAttributes {
  id: number,
  username: string,
  email: string,
  hashedPassword: string
}

export type UserPOJO = {
  id: number,
  username: string,
  email: string,
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: 'users'
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  
  @AllowNull(false)
  @Unique
  @Column
  public username!: string;

  
  @AllowNull(false)
  @Unique
  @Column
  public email!: string;
  
  @AllowNull(false)
  @Column
  public hashedPassword!: string;    

  @BelongsToMany(() => Budget, () => UserBudget)
  public budgets!: Budget[]

  override toJSON() {
    const user = super.toJSON() as UserPOJO;
    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
};

export default User;
