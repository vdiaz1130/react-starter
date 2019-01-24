import { Length, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { EmailExist } from './emailExist';
import { PasswordMixin } from '../../_shared/passwordMixin';

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @EmailExist({ message: 'email already in use' })
  email: string;
}
