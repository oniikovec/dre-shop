import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { checkUserSession } from "./store/user/user.action";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { GlobalStyle } from "./global.styles";

const App = () => {
  /* this dispatch dispatches actions to root-reducer which dispatches
  actions to every single reducer function, so its the only one instance
  of dispatch. the [dispatch] at the end is not necessary to pass if you
  dont want to, its only for the lint error to go away*/
  const dispatch = useDispatch() 

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop/>} />
          <Route path="auth" element={<Authentication/>} />
          <Route path="checkout" element={<Checkout />} />
        </Route>      
      </Routes>
    </div>
  )
}

export default App;
