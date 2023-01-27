import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674833287711 implements MigrationInterface {
    name = 'sync1674833287711'

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
            CREATE TABLE "book" (
                "bookId" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "description" text,
                "price" real NOT NULL,
                "poster" character varying,
                "isNew" boolean NOT NULL,
                "isBestseller" boolean NOT NULL,
                CONSTRAINT "PK_dc3b1731d65c319e954cb621c1b" PRIMARY KEY ("bookId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "fullName" character varying,
                "email" character varying NOT NULL,
                "avatar" character varying,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
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
            DROP INDEX "public"."IDX_44dbbd935cdd96c17dcd9986c4"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4c668b693b31f87e3995434261"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }

}
