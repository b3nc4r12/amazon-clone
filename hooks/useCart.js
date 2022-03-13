import { createContext, useContext, useState, useMemo } from "react"

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const selectTotal = (cart) => cart.reduce((acc, item) => acc + item.price, 0);

    const addToCart = (product) => setCart([...cart, product]);

    const removeFromCart = (id) => {
        const index = cart.findIndex((item) => item.id === id);

        let newCart = [...cart]

        if (index >= 0) {
            newCart.splice(index, 1);
        } else {
            console.warn(`Can't remove product with id ${id} as it's not in the cart!`);
        }

        setCart(newCart);
    }

    const emptyCart = () => setCart([]);

    const memoedValue = useMemo(() => ({
        cart,
        selectTotal,
        addToCart,
        removeFromCart,
        emptyCart
    }), [cart])

    return (
        <CartContext.Provider value={memoedValue}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export default useCart