import { useSelector } from "react-redux";
import CartAmount from "../../Components/CartAmount/cart-amount";
import { CartData } from "../../Components/CartData/cart-data";
import CartList from "../../Components/CartList/cart-list";
import s from "./index.module.css";

export const CartPage = () => {
  const productsCart = useSelector((state) => state.cart.data);
  return (
    <div className="container container_inner">
      <div className={s.contentCart}>
        <CartData />
        <CartList productsCart={productsCart} />
        <CartAmount />
      </div>
    </div>
  );
};
