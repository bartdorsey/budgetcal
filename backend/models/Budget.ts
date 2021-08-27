import { Model } from 'objection';
import User from './User.js';
import knex from '../database.js';


interface Budget {
    id: number,
    name: string,
    amount: number,
    color: string,
    icon: string,
    created_at: Date,
    updated_at: Date
}

class Budget extends Model {
    static override tableName = 'budgets';

    static override relationMappings = {
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: User,
            join: {
                from: 'budgets.id',
                through: {
                    from: 'users_budgets.budget_id',
                    to: 'users_budgets.budget_id'
                },
                to: 'users.id'
            }
        }
    }
    async users() {
        return this.$relatedQuery('users');
    }
}

Budget.knex(knex);

export default Budget;
