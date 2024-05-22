import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion"

import './cartButton.css'
import CartIcon from './assets/CartIcon';
import ItemIcon from './assets/ItemIcon';

let initialState = {
    item: {
        x: 0,
        y: -22,
        opacity: 0,
        rotate: 0
    },
    icon: {
        x: 0,
        opacity: 100,
        width: 35,
        rotate: 0
    },
    text:{
        x: 0,
        opacity: 100
    }
}

enum Phase {
    "One" = "One",
    "Two" = "Two",
    "Three" = "Three",
    "Four" = "Four"
}

function CartButton () {
    const cartButton = useRef<any>(null)
    const [cartState, setCartState] = useState(initialState)

    let [cartButtonSetting, setCartButtonSetting] = useState({ width: 0 })
    let [transitionDuration, setTransitionDuration] = useState({duration: 1})

    const handleClick = (e: any) => {
        console.log(e)

        updateCartState()
        
        // Second animation (Item drop)
        setTimeout(() => {
            updateCartState(Phase.Two)
        }, 1000);
        
        // Third animation (Tilt icons)
        setTimeout(() => {
            updateCartState(Phase.Three)
        }, 1200);
        
        // Fourth animation (Move out)
        setTimeout(() => {
            updateCartState(Phase.Four)
        }, 2000);
        
        // Reset the click
        setTimeout(() => {
            setCartState(initialState)
            setTransitionDuration({ duration: 0 })
        }, 4000);
    }
    
    const updateCartState = (phase = Phase.One) => {

        setCartState({...initialState,
            item: {...initialState.item,
                x: phase === Phase.Three ? -5 : phase === Phase.Four ? 95 : 0,
                y: phase === Phase.Two ? 10 : (phase === Phase.Three || phase === Phase.Four) ? 7 : initialState.item.y,
                opacity: 100,
                rotate: phase === Phase.Three || phase === Phase.Four ? -10 : 0,
            },
            icon: {...initialState.icon,
                x: phase === Phase.Four ? cartButtonSetting.width + 12 : (cartButtonSetting.width/2) - initialState.icon.width + 10,
                rotate: phase === Phase.Three || phase === Phase.Four ? -10 : 0,
                width: phase === Phase.One || phase === Phase.Two || phase === Phase.Three ? initialState.icon.width + 10 : initialState.icon.width
            },
            text: {...initialState.text,
                x: cartButtonSetting.width,
                opacity: 0
            }
        })

        setTransitionDuration({
            duration: 
                    phase === Phase.Two ? 0.2 :
                    phase === Phase.Three ? 0.2 :
                    0.6
        })
    }

    // Initialization
    useEffect(()=>{
        setCartButtonSetting({width: (cartButton?.current)?.offsetWidth})
    }, [])
    
    return (
        <div className="cartButton">

            <button onClick={handleClick} ref={cartButton} >
                {/* Item to be dropped */}
                <motion.span className="itemIcon" 
                    // initial={{ y: 0 }}
                    animate={{ ...cartState.item }}
                    // animate={{ y:  }}
                    transition={{...transitionDuration}}
                    > 
                    <ItemIcon />
                </motion.span>

                {/* Cart Icon  */}
                <motion.span className="cartIcon"
                    // initial={{ x: 0 }}
                    animate={{ ...cartState.icon }}
                    transition={{...transitionDuration}}
                    >
                    <CartIcon />
                </motion.span>
                
                {/* Cart Text  */}
                <motion.span className="text"
                    // initial={{ x: 0 }}
                    animate={{ ...cartState.text }}
                    transition={{...transitionDuration}}
                >
                    Add To Cart
                </motion.span>
            </button>
        </div>
    )
}

export default CartButton