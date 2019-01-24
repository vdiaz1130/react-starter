import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { RegisterInput } from './registerInput';
import { logger } from 'core/middleware/logger';
import { isAuth } from 'core/middleware/isAuth';
import { User } from 'core/entity/user';
import { sendEmail } from 'core/utilities/sendMail';
import { createConfirmationUrl } from 'core/utilities/createConfirmationUrl';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(logger, isAuth)
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }

  @Mutation(() => User)
  async register(@Arg('data')
  {
    email,
    firstName,
    lastName,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    const confirmationURL = await createConfirmationUrl(user.id);
    await sendEmail(user.email, confirmationURL);

    user.confirmationURL = confirmationURL;
    return user;
  }
}
