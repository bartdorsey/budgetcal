'use strict';
import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import sequelize from './sequelizeSetup';

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

export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public hashedPassword!: string;    

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
  };
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }

  toJSON() {
    const user = super.toJSON() as UserPOJO;
    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
};

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'users',
});