import { type APIRequestContext } from '@playwright/test';

export type CreditCardData = {
  cardNum: number;
  expMonth: string;
  expYear: string;
  fullName: string;
};

export async function createCard(
    request: APIRequestContext,
    token: string,
    overrides: Partial<CreditCardData> = {}
) {
    const creditCard: CreditCardData = {
        cardNum: 1111222233334444,
        expMonth: '1',
        expYear: '2080',
        fullName: 'My CC',
        ...overrides,
    };

    const creditCardResponse = await request.post('/api/Cards', {
        headers: { Authorization: `Bearer ${token}` }, 
        data: creditCard,
    });
    if (!creditCardResponse.ok()) throw new Error(`Credit Card creation failed: ${creditCardResponse.status()}`);

    return creditCard;
}