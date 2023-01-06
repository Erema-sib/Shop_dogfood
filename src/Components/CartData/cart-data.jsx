import { useSelector } from "react-redux";
import { cartInfoSel } from "../../storage/cart/cartSlice";
import "./style.css";

export const CartData = () => {
  const state = useSelector((state) => state);
  const { totalCount } = cartInfoSel(state);

  return (
    <div className="cartTitle">
      <span>{totalCount} товаров</span> в корзине
    </div>
  );
};
