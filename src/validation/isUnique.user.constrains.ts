import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { IsUniqueConstraintInput } from './isUnique.user';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'UniqueValidator', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) { }
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const { tableName, column }: IsUniqueConstraintInput = args.constraints[0];

        const result = await this.entityManager
            .getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({ [column]: value })
            .getOne();

        console.log(`result : ${result}`)

        return result ? false : true; // not unique return false
        // for another way return !result
    }

    defaultMessage(args?: ValidationArguments) {
        const filed = args.property
        return `${filed} is already exists!`;
    }
}