import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675452193736 implements MigrationInterface {
    name = 'sync1675452193736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "book" (
                "bookId" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "description" text,
                "price" real NOT NULL,
                "poster" character varying,
                "releaseDate" date,
                "averageRating" real NOT NULL,
                "isNew" boolean NOT NULL,
                "isBestseller" boolean NOT NULL,
                CONSTRAINT "PK_dc3b1731d65c319e954cb621c1b" PRIMARY KEY ("bookId")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "ratingId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_dac5bb15a084a0cffce6a51e8d9" UNIQUE ("ratingId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_dac5bb15a084a0cffce6a51e8d9" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_88ad6f261d3853cc7f299e740e6" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_4c668b693b31f87e39954342612" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_4c668b693b31f87e39954342612"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_88ad6f261d3853cc7f299e740e6"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_dac5bb15a084a0cffce6a51e8d9"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_dac5bb15a084a0cffce6a51e8d9"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "ratingId"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
    }

}
