import { CartItemContainer, Img, ItemDetails, ItemName, ItemPrice } from "./cart-item.styles"

const CartItem = ({ cartItem }) => {

  const { name, imageUrl, price, quantity } = cartItem

  return (
    <CartItemContainer>
      <Img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <ItemPrice>{quantity} x ${price}</ItemPrice>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem