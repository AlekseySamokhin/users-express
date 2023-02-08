import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675848100627 implements MigrationInterface {
    name = 'sync1675848100627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "favorite_book" (
                "id" SERIAL NOT NULL,
                "bookId" integer,
                "userId" integer,
                CONSTRAINT "PK_12cce8678b1fa10d60eeaa0cc95" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite_book"
            ADD CONSTRAINT "FK_9a9b31e8e92dbf2ff9048f6f203" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite_book"
            ADD CONSTRAINT "FK_4ffac69576703ad2084fc7c8abf" FOREIGN KEY ("bookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "favorite_book" DROP CONSTRAINT "FK_4ffac69576703ad2084fc7c8abf"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite_book" DROP CONSTRAINT "FK_9a9b31e8e92dbf2ff9048f6f203"
        `);
        await queryRunner.query(`
            DROP TABLE "favorite_book"
        `);
    }

}
