import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675163727972 implements MigrationInterface {
    name = 'sync1675163727972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "releaseDate" date
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "rating" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "releaseDate"
        `);
    }

}
