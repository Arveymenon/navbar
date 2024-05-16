import React from 'react';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { motion } from "framer-motion"
import { Item } from '../types';
// import { Item } from '../';

const highlightState = {
  left: 0,
  initial: {
    width: 0,
    widthAnimate: 0
  },
  duration: 1
}

function App(params: {items: Item[]}) {

  const [selectedItem, setSelectedItem] = useState(0)
  const [highlight, setHighlight] = useState(highlightState)
  const navBar = useRef<any>(null)

  const selectedItemClass="item active"
  const unselectedItemClass="item"
  
  // initial position of the highlight
  useEffect(()=>{
    updateHighlight(0,true)
  }, [])

  const startTransition = (index: number) => {
    setSelectedItem(index);
    updateHighlight(index)
  }

  const updateHighlight = (index: number, initialSetUp=false) => {
    let updatedState = {...highlight}
    // X translation logic 
    updatedState.left = navBar?.current?.['children'][index]['offsetLeft']
    
    // Width Transformation logic
    updatedState.initial.width = (navBar?.current?.['children'][index])?.getBoundingClientRect().width
    updatedState.initial.widthAnimate = updatedState.initial.width
    if(!initialSetUp) {
      updatedState.initial.width = updatedState.initial.widthAnimate
      updatedState.initial.widthAnimate = (navBar?.current?.['children'][index])?.getBoundingClientRect().width
    }
    setHighlight(updatedState)
  }

  return (
    <div className="App">
      <div className="columns-2">
        <p>React app with tailwind is ready</p>
      </div>

      {/* NavBar */}

      <div className="navbar">
        
        <motion.div className="highlight"
            initial={{ width: highlight.initial.width }}
            animate={{ width: [highlight.initial.width - 20, highlight.initial.width + 50, highlight.initial.widthAnimate], x: highlight.left }}
            transition={{duration: 0.5}}
          />

        <div className="grid grid-flow-col auto-cols-max navbar-items" ref={navBar}>

          {/* Item */}
          
          {params.items.map((item, index)=>{
            return <div key={index} className={selectedItem === index ? selectedItemClass:unselectedItemClass} onClick={()=>startTransition(index)}>
                {item.content}
              </div>
          })}
            
          {/* Item end */}

        </div>

      </div>

      {/* NavBar end*/}
    </div>
  );
}

export default App;
