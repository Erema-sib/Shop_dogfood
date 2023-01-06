import ContentLoader from "react-content-loader";
import cn from "classnames";
import "./style.css";
import { ReactComponent as SaveImage } from "./save.svg";
import { calcDiscountPrice, isLiked } from "../../Utils/product_card";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeLikeProduct } from "../../storage/products/productsSlice";
import { addCart } from "../../storage/cart/cartSlice";

const Card = ({
  name,
  price,
  _id,
  likes,
  discount,
  weight,
  description,
  pictures,
  tags,
  allData,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.getRequest);
  const currentUser = useSelector((state) => state.user.data);
  const discount_price = calcDiscountPrice(price, discount);

  const liked = isLiked(likes, currentUser._id);

  const handleLikeClick = useCallback(() => {
    return dispatch(fetchChangeLikeProduct({ _id, likes }));
  }, [dispatch, _id, likes]);

  const handleAddCartClick = useCallback(
    (e) => {
      e.preventDefault();
      return dispatch(addCart(allData));
    },
    [dispatch, allData]
  );

  return (
    <>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={186}
          height={385}
          viewBox="0 0 186 385"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <path d="M 0 0 h 185.6 v 187 H 0 z M 0 203 h 186 v 14 H 0 z M 0 233 h 186 v 56 H 0 z M 0 305 h 186 v 24 H 0 z" />
          <rect x="0" y="345" rx="20" ry="20" width="121" height="40" />
        </ContentLoader>
      ) : (
        <div className="card">
          <div className="card_sticky card_sticky_type_top-left">
            {discount !== 0 && (
              <span className="card_discount">{`-${discount}%`}</span>
            )}
            {tags &&
              tags.map((tag) => (
                <span key={tag} className={`tag tag_type_${tag}`}>
                  {tag}
                </span>
              ))}
          </div>
          <div className="card_sticky card_sticky_type_top-right">
            <button
              className={cn("card_favorite", {
                "card_favorite_is-active": liked,
              })}
              onClick={handleLikeClick}
            >
              <SaveImage className="card_favorite-icon" />
            </button>
          </div>
          <Link to={`/product/${_id}/`} className="card_link">
            <img src={pictures} alt={description} className="card_image" />
            <div className="card_desc">
              <span className={discount !== 0 ? "card_oldprice" : "card_price"}>
                {price}&nbsp;₽
              </span>
              {discount !== 0 && (
                <span className="card_price card_price_type_discount">
                  {discount_price}&nbsp;₽
                </span>
              )}
              <span className="card_weight">{weight}</span>
              <p className="card_name">{name}</p>
            </div>
          </Link>
          <a
            href="#"
            className="card_cart btn btn_type_primary"
            onClick={handleAddCartClick}
          >
            В корзину
          </a>
        </div>
      )}
    </>
  );
};

export default Card;
