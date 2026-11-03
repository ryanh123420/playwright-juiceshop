import { type APIRequestContext } from '@playwright/test';

export type AuthData = {
    token: string;
    bid: number;
};

export async function apiLogin(request: APIRequestContext, email: string, password: string): Promise<AuthData> {
    const loginResponse = await request.post('/rest/user/login', {
        data: { email, password}
    });
    if (!loginResponse.ok()) throw new Error(`Login failed: ${loginResponse.status()}`);
    const body = await loginResponse.json();
    // bid is the ID of the user's basket, needed to add items to it through the API
    return { token: body.authentication.token, bid: body.authentication.bid };
}
