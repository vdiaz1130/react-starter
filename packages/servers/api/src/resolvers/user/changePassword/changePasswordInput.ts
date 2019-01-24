import { Field, InputType } from 'type-graphql';
import { PasswordMixin } from '../../_shared/passwordMixin';

@InputType()
export class ChangePasswordInput extends PasswordMixin(class {}) {
  @Field()
  token: string;
}
