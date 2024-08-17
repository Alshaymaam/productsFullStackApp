import { CartProduct } from "../app/features/cartSlice";

export const addItemToShoppingCart = (cartItem: CartProduct, shoppingCartItems: CartProduct[]): CartProduct[] => {
    const existsItem = shoppingCartItems.find(item => item.id === cartItem.id);

    if (existsItem) {
        return shoppingCartItems.map(item =>
            item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
    }
};
