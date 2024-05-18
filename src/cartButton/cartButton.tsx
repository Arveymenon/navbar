import React from 'react';
import { motion } from "framer-motion"

import './cartButton.css'
import CartIcon from './assets/CartIcon';

function CartButton () {

    const handleClick = (e: Object) => {
        console.log(e)
    }

    return (
        <>
            <motion.button onClick={handleClick}>
                <span className="cartIcon">
                    <CartIcon />
                </span>
                <span className="text">
                    Add To Cart
                </span>
            </motion.button>
        </>
    )
}

export default CartButton