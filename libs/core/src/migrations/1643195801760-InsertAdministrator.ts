import { MigrationInterface, QueryRunner } from "typeorm";
import { CoreUserEntity } from "../modules/core-users";
import { CryptoUtil } from "../utils";
export class InsertAdministrator1643195801760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordHashedSalt: string = CryptoUtil.generateRandomString(12);
        const passwordHashed: string = CryptoUtil.generateSHA256('123456', passwordHashedSalt);
        const userEntity = new CoreUserEntity({
            username: 'sysadmin',
            email: 'svohong@bocasay.com',
            address: '161A Phan Dang Luu Street, Ward 1, Phu Nhuan District, Ho Chi Minh City, Vietnam',
            passwordHashed,
            passwordHashedSalt
        });
        await queryRunner.manager.save(userEntity);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
