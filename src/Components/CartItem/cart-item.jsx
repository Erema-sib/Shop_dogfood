import "./style.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addCartAfterChange,
  decreaseByOne,
  increaseByOne,
  removeProduct,
} from "../../storage/cart/cartSlice";
import { ButtonCount } from "../ButtonCount/button-count";
import ProductPrice from "../ProductPrice/product-price";
import { ReactComponent as TrashIcon } from "./trash.svg";
import GiftLabel from "../GiftLabel/gift-label";

const CartItem = ({
  allData,
  name,
  price,
  _id,
  discount,
  wight,
  pictures,
  tags,
  quantity,
  isGift = false,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="сartItemm">
        <div className="cartDesc">
          <img src={pictures} alt={name} className="cartImage" />
          <Link to={`/product/${_id}`} className="cartLink">
            <h2 className="cartTitle2">{name}</h2>
          </Link>
          <p className="cartWeight">{wight}</p>
        </div>
        {!isGift && (
          <ButtonCount
            amount={quantity}
            increment={() => dispatch(increaseByOne(allData))}
            decrement={() => dispatch(decreaseByOne(allData))}
            countChange={(newQuantity) =>
              dispatch(
                addCartAfterChange({ ...allData, quantity: newQuantity })
              )
            }
          />
        )}
        {!isGift && (
          <div className="cartPrice">
            <ProductPrice
              price={price}
              discount={discount}
              type="big"
              align="right"
            />
          </div>
        )}
        {!isGift && (
          <button
            className="btnTrash"
            onClick={() => dispatch(removeProduct(allData))}
          >
            <TrashIcon />
          </button>
        )}
        {isGift && <GiftLabel title="Подарок" text="за первый заказ!" />}
      </div>
    </>
  );
};

export default CartItem;
