import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  UseMiddleware
} from 'type-graphql';
import { Middleware } from 'type-graphql/interfaces/Middleware';

// As described in TypeGraphQL (as abstract class)
// export function createEntityBaseResolver<
//   T extends ClassType,
//   X extends ClassType
// >(suffix: string, returnType: T, inputType: X, entity: any) {
//   @Resolver({ isAbstract: true })
//   abstract class CreateBaseResolver {
//     @Mutation(() => returnType, { name: `create${suffix}` })
//     async create(@Arg('data', () => inputType) data: any) {
//       return entity.create(data).save();
//     }
//   }

//   return CreateBaseResolver;
// }

// Not as abstract class. Can execute directly as oppose to extending abstract.
// Saves one step.
export function createEntityBaseResolver<
  T extends ClassType,
  X extends ClassType
>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class CreateBaseResolver {
    @UseMiddleware(...(middleware || []))
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg('data', () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return CreateBaseResolver;
}
