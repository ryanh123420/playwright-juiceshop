import { type APIRequestContext } from '@playwright/test';
import { SECURITYOPTIONS } from '../data/SecurityQuestionOptions'

export function uniqueEmail() {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
}

export async function createUser(request: APIRequestContext) {
  const email = uniqueEmail();
  const password = 'Password123!';
  const securityQuestion = SECURITYOPTIONS.favoriteMovie;
  const securityAnswer = 'Answer123';

  const response = await request.post('/api/Users', {
    data: { email, password, passwordRepeat: password, securityQuestion, securityAnswer },
  });
  if (!response.ok()) throw new Error(`User creation failed: ${response.status()}`);

  return { email, password };
}