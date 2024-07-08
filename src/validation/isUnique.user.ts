import { ValidationOptions, registerDecorator } from "class-validator";
import { IsUniqueConstraint } from "./isUnique.user.constrains";


export type IsUniqueConstraintInput = {
    tableName: string,
    column: string
}
export function isUnique(options: IsUniqueConstraintInput,
    validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'is_unique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint
        })
    }
}