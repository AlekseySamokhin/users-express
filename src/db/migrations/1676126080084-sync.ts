import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676126080084 implements MigrationInterface {
    name = 'sync1676126080084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "genreId" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c" UNIQUE ("name"),
                CONSTRAINT "PK_041e5e8bf2ed5cd029c2f8c74a1" PRIMARY KEY ("genreId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" SERIAL NOT NULL,
                "text" text,
                "bookId" character varying,
                "userId" integer,
                "dateOfcreation" TIMESTAMP NOT NULL DEFAULT now(),
                "bookBookId" integer,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "fullName" character varying,
                "email" character varying NOT NULL,
                "avatar" character varying,
                "password" character varying NOT NULL,
                "ratingId" integer,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "REL_dac5bb15a084a0cffce6a51e8d" UNIQUE ("ratingId"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "id" SERIAL NOT NULL,
                "rating" real,
                "bookBookId" integer,
                "userId" integer,
                CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id")
            )
        `);
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
            CREATE TABLE "favorite_book" (
                "id" SERIAL NOT NULL,
                "bookId" integer,
                "userId" integer,
                CONSTRAINT "PK_12cce8678b1fa10d60eeaa0cc95" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genres_genre" (
                "bookBookId" integer NOT NULL,
                "genreGenreId" integer NOT NULL,
                CONSTRAINT "PK_2e682fdaca2b2dcb9a6639cc5ee" PRIMARY KEY ("bookBookId", "genreGenreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4c668b693b31f87e3995434261" ON "book_genres_genre" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_44dbbd935cdd96c17dcd9986c4" ON "book_genres_genre" ("genreGenreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_35cdbaf743c6172ec19a0d1f766" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite_book"
            ADD CONSTRAINT "FK_9a9b31e8e92dbf2ff9048f6f203" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite_book"
            ADD CONSTRAINT "FK_4ffac69576703ad2084fc7c8abf" FOREIGN KEY ("bookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_4c668b693b31f87e39954342612" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_44dbbd935cdd96c17dcd9986c48" FOREIGN KEY ("genreGenreId") REFERENCES "genre"("genreId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_44dbbd935cdd96c17dcd9986c48"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_4c668b693b31f87e39954342612"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite_book" DROP CONSTRAINT "FK_4ffac69576703ad2084fc7c8abf"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite_book" DROP CONSTRAINT "FK_9a9b31e8e92dbf2ff9048f6f203"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_88ad6f261d3853cc7f299e740e6"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_dac5bb15a084a0cffce6a51e8d9"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_35cdbaf743c6172ec19a0d1f766"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_44dbbd935cdd96c17dcd9986c4"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4c668b693b31f87e3995434261"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "favorite_book"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }

}
