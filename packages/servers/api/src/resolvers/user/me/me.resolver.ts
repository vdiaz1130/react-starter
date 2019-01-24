import { Resolver, Query, Ctx } from 'type-graphql';

import { AppContext } from '../../../types/appContext';
import { User } from 'core/entity/user';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return await User.findOne(ctx.req.session!.userId);
  }
}
