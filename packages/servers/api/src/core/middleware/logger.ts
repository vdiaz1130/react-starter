import { MiddlewareFn } from 'type-graphql';
import { AppContext } from '../../types/appContext';

export const logger: MiddlewareFn<AppContext> = async (_, next) => {
  console.log('Log things here...');

  return next();
};
