import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action'
import { CheckoutItemContainer, ImageContainer, Img, Name, Quantity, Arrow, Value, Price, RemoveButton } from './checkout-item.styles'

const CheckoutItem = ({ cartItem }) => {
  
  const { imageUrl, name, quantity, price } = cartItem
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))


  return (
    <CheckoutItemContainer>
      <ImageContainer>
         <Img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem