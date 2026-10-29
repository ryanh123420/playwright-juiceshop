import { type APIRequestContext } from '@playwright/test';

export async function apiLogin(request: APIRequestContext, email: string, password: string) {
    const loginResponse = await request.post('/rest/user/login', {
        data: { email, password}
    });
    if (!loginResponse.ok()) throw new Error(`Login failed: ${loginResponse.status()}`);
    const body = await loginResponse.json();
    return body.authentication.token as string;
}