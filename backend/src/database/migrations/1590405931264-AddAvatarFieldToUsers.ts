import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAvatarFieldToUsers1590405931264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name:'avatar',
            type: 'varchar',
            isNullable: true,
        }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.dropColumn('users', 'avatar');
    }

}
