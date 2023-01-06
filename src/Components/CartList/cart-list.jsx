import CartItem from "../CartItem/cart-item";
import { NotFound } from "../NotFound/NotFound";
import s from "./index.module.css";

const CartList = ({ productsCart }) => {
  return (
    <>
      {!productsCart.length && (
        <NotFound buttonText="На главную" title="Ваша корзина пуста" />
      )}
      <div className={s.cartList}>
        {productsCart.map((i, index) => (
          <CartItem key={i._id} allData={i} {...i} />
        ))}
      </div>
    </>
  );
};

export default CartList;
