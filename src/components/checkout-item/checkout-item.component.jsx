import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import { CheckoutItemContainer, ImageContainer, Img, Name, Quantity, Arrow, Value, Price, RemoveButton } from './checkout-item.styles'

const CheckoutItem = ({ cartItem }) => {
  
  const { imageUrl, name, quantity, price } = cartItem
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)
  
  const addItemHandler = () => addItemToCart(cartItem)
  const removeItemHandler = () => removeItemFromCart(cartItem)
  const clearItemHandler = () => clearItemFromCart(cartItem);


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