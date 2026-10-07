import { request } from '@playwright/test';
import { createUser } from '../helpers/users';

/**
 * Create a user for manual checks
 * Run with:
 * npm run create-user
 */
async function main() {
  const api = await request.newContext({ baseURL: 'http://localhost:3000' });
  const user = await createUser(api);
  console.log(user);
  await api.dispose();
}

main();