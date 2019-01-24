import { createConnection, Connection, ConnectionOptionsReader } from 'typeorm';

const connectionOptionsReader = new ConnectionOptionsReader({
  root: process.cwd()
});

let connectionOptions;
let connection: Promise<Connection>;

export async function createTypeormConn(): Promise<Connection> {
  if (!connection) {
    connectionOptions = {
      ...(await connectionOptionsReader.get('default'))
    };
    connection = createConnection(connectionOptions);
  }

  return connection;
}
