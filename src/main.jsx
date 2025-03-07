import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import React from 'react';
import Store from "./components/reduxtoolkit/store/Store.jsx";
import CartNav from './components/reduxtoolkit/CartNav.jsx';
import CartTodoList from './components/reduxtoolkit/CartTodoList.jsx';
import './styles/CartToDo.css'

let root = createRoot(document.getElementById("root"));
root.render(
  <Fragment>
    <Provider store={Store}>
      {/* <CartNav></CartNav */}
      <CartTodoList></CartTodoList>
    </Provider>
  </Fragment>
);
