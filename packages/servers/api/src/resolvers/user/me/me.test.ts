import { Connection } from 'typeorm';
import faker from 'faker';
import { User } from 'core/entity/user';
import { testConn } from 'core/testUtilities/testConn';
import { graphCall } from 'core/testUtilities/graphCall';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

// TODO: Abstract
const meQuery = `
  {
    me {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

describe('Me', () => {
  it('get user', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(10)
    }).save();

    const response = await graphCall({
      source: meQuery,
      userId: user.id
    });

    console.log(response);

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });

    expect(user).toBeDefined();
    expect(user!.firstName).toBe(user.firstName);
    expect(user!.lastName).toBe(user.lastName);
    expect(user!.lastName).toBe(user.lastName);
    expect(user!.email).toBe(user.email);
  });

  it('return null user.id is undefined', async () => {
    const response = await graphCall({
      source: meQuery
    });

    expect(response).toMatchObject({
      data: {
        me: {}
      }
    });
  });

  it('return null user.id is incorrect', async () => {
    const response = await graphCall({
      source: meQuery,
      userId: 123456789123456789
    });

    expect(response).toMatchObject({
      data: {
        me: {}
      }
    });
  });
});
