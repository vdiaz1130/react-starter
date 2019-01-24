import { Arg, Mutation, Resolver, Ctx } from 'type-graphql';
import { User } from 'core/entity/user';
import { ChangePasswordInput } from './changePasswordInput';
import { AppContext } from 'types/appContext';
import { redis } from 'redis';
import { forgotPasswordPrefix } from 'core/constant/redisPrefixes';
import { hash } from 'bcryptjs';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput,
    @Ctx() ctx: AppContext
  ): // @Ctx() ctx: AppContext
  Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);
    user.password = await hash(password, 12);
    await user.save();

    ctx.req.session!.userId = user.id;
    return user;
  }
}
