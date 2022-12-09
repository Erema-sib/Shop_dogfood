import cn from "classnames";
import './style.css';
import {ReactComponent as SaveImage} from "./save.svg"
import { calcDiscountPrice, isLiked } from "../Utils/product_card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextUser } from "../../Context/ContextUser";
import { CardContext } from "../../Context/cardContext";



const Card = ({ name, price, _id, likes, discount, weight, description, pictures, tags }) => {

  const {user: currentUser} = useContext(ContextUser);
  const {handleLike: onProductLike} = useContext(CardContext);
  const discount_price = calcDiscountPrice(price,discount);
 
  const liked = isLiked(likes, currentUser._id)
  
  function handleLikeClick() {
    onProductLike({ _id, likes})
  }
  
  
  return (
    <div className="card">
        <div className="card_sticky card_sticky_type_top-left">
            {discount !== 0 && <span className="card_discount">{`-${discount}%`}</span>}
            {tags && tags.map(tag => <span key={tag} className={`tag tag_type_${tag}`}>{tag}</span>)}
        </div>
       <div className="card_sticky card_sticky_type_top-right">
           <button className={cn("card_favorite", {"card_favorite_is-active" : liked})} onClick={handleLikeClick}>
               <SaveImage className="card_favorite-icon"/>
            </button>
        </div>
        <Link to={`/product/${_id}/`} className="card_link">
          <img src={pictures} alt={description} className="card_image"/>
          <div className="card_desc">
            <span className={discount !== 0 ? "card_oldprice" : "card_price"}>{price}&nbsp;₽</span>
            {discount !== 0 && <span className="card_price card_price_type_discount">{discount_price}&nbsp;₽</span>}
            <span className="card_weight">{weight}</span>
            <p className="card_name">{name}</p>

          </div>
        </Link>
        <a href="#" className="card_cart btn btn_type_primary">В корзину</a>
    </div>
  );
};

export default Card;