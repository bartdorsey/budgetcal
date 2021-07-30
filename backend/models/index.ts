'use strict';
import { Sequelize } from 'sequelize';
import sequelize from './sequelizeSetup';
import User from './user';

const models = {
  User  
}

User.associate(models);

export { User, sequelize, Sequelize };

