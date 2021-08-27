import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1630004950664 implements MigrationInterface {
    name = 'initialMigration1630004950664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" integer NOT NULL, "icon" character varying NOT NULL DEFAULT 'AttachMoney', "color" character varying NOT NULL DEFAULT 'none', CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_budgets_budget" ("userId" integer NOT NULL, "budgetId" integer NOT NULL, CONSTRAINT "PK_1b5854196ba939e92e0c42f68c4" PRIMARY KEY ("userId", "budgetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_84d2403bf55c5865076b34b7fc" ON "user_budgets_budget" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_941a9737fad9a89f1f95146ab5" ON "user_budgets_budget" ("budgetId") `);
        await queryRunner.query(`ALTER TABLE "user_budgets_budget" ADD CONSTRAINT "FK_84d2403bf55c5865076b34b7fca" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_budgets_budget" ADD CONSTRAINT "FK_941a9737fad9a89f1f95146ab55" FOREIGN KEY ("budgetId") REFERENCES "budget"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_budgets_budget" DROP CONSTRAINT "FK_941a9737fad9a89f1f95146ab55"`);
        await queryRunner.query(`ALTER TABLE "user_budgets_budget" DROP CONSTRAINT "FK_84d2403bf55c5865076b34b7fca"`);
        await queryRunner.query(`DROP INDEX "IDX_941a9737fad9a89f1f95146ab5"`);
        await queryRunner.query(`DROP INDEX "IDX_84d2403bf55c5865076b34b7fc"`);
        await queryRunner.query(`DROP TABLE "user_budgets_budget"`);
        await queryRunner.query(`DROP TABLE "budget"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
