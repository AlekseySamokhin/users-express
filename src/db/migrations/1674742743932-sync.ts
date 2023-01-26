import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674742743932 implements MigrationInterface {
    name = 'sync1674742743932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "poster"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "poster" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "isBestseller"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "isBestseller" boolean NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "isBestseller"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "isBestseller" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "poster"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "poster" boolean
        `);
    }

}
