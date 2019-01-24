import { ClassType, Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass {
    @Field()
    @Length(4, 12, {
      message: 'Too long. Should be between $constraint1 and $constraint2'
    })
    password: string;
  }

  return PasswordInput;
};
