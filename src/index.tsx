import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './navbar/navbar';
import reportWebVitals from './reportWebVitals';
import CartButton from './cartButton/cartButton';

let items = [
  {content: "item1", text: ""},
  {content: "item2"},
  {content: "item3", text: ""}
]

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Navbar items={items}/>
    <CartButton />
    <div className="testBlock"></div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();