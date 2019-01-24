import { buildSchema } from 'type-graphql';

export const createSchema = () => {
  console.log(__dirname + '/../../resolvers/**/*.resolver.ts');
  return buildSchema({
    resolvers: [__dirname + '/../../resolvers/**/*.resolver.ts']
  });
};
