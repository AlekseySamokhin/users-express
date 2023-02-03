import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675407542223 implements MigrationInterface {
    name = 'sync1675407542223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "ratingId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_dac5bb15a084a0cffce6a51e8d9" UNIQUE ("ratingId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "averageRating" real NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_dac5bb15a084a0cffce6a51e8d9" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_dac5bb15a084a0cffce6a51e8d9"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "averageRating"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_dac5bb15a084a0cffce6a51e8d9"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "ratingId"
        `);
    }

}
