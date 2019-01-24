import { RegisterInput } from '../register/registerInput';
import { createEntityBaseResolver } from '../../_shared/createEntityBaseResolver';
import { User } from 'core/entity/user';

export const CreateUserResolver = createEntityBaseResolver(
  'User',
  User,
  RegisterInput,
  User
);
