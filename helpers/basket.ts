import { type APIRequestContext } from '@playwright/test';

export type BasketItemData = {
    ProductId: number;
    BasketId: number;
    quantity: number;
};

// Product IDs from the Juice Shop database
export const PRODUCTS = {
    appleJuice: { id: 1, name: 'Apple Juice (1000ml)' },
} as const;

export async function addToBasket(
    request: APIRequestContext,
    token: string,
    bid: number,
    overrides: Partial<BasketItemData> = {}
) {
    const basketItem: BasketItemData = {
        ProductId: PRODUCTS.appleJuice.id,
        BasketId: bid,
        quantity: 1,
        ...overrides,
    };

    const basketResponse = await request.post('/api/BasketItems', {
        headers: { Authorization: `Bearer ${token}` },
        data: basketItem,
    });
    if (!basketResponse.ok()) throw new Error(`Adding to basket failed: ${basketResponse.status()}`);

    return basketItem;
}
