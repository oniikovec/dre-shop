import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom"
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { NavigationContainer, LogoContainer, NavLinks, Navlink } from "./navigation.styles";

const Navigation = () => {

  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)


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