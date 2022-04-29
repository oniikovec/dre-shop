import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { Outlet } from "react-router-dom"

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from '../../store/user/user.selector.js'
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { signOutStart } from '../../store/user/user.action';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { NavigationContainer, LogoContainer, NavLinks, Navlink } from "./navigation.styles";

const Navigation = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <Navlink to="/shop">
            SHOP
          </Navlink>
          {currentUser ? (
              <Navlink as='span' onClick={signOutUser}>SIGN OUT</Navlink>
            ) : (
              <Navlink to="/auth">
                SIGN IN
              </Navlink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;