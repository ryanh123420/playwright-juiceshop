import { type APIRequestContext } from '@playwright/test';

export type AddressData = {
  country: string;
  fullName: string;
  mobileNum: number;
  zipCode: string;
  streetAddress: string;
  city: string;
  state: string;
};

export async function createAddress(
    request: APIRequestContext, 
    token: string, 
    overrides: Partial<AddressData> = {}
) {
    const address: AddressData = {
        country: 'US',
        fullName: 'Test Address',
        mobileNum: 1234567890,
        zipCode: '12345',
        streetAddress: '123 Street',
        city: 'City',
        state: 'State',
        ...overrides,
    };

    const addressResponse = await request.post('/api/Addresss', {
        headers: { Authorization: `Bearer ${token}` },
        data: address,
    });
    if (!addressResponse.ok()) throw new Error(`Address creation failed: ${addressResponse.status()}`);
    const body = await addressResponse.json();

    // Keep the data we sent and add the id the server gave the new address
    return { ...address, id: body.data.id as number };
}