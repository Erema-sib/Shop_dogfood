import './style.css';
import saveimage from "./save.svg"



const Card = ({ name, price, discount, weight, description, picture }) => {

  const discount_price = Math.round(price - (price * discount)/100);
  return (
    <div className="card">
        <div className="card_sticky card_sticky_type_top-left">
            {discount !== 0 && <span className="card_discount">{`-${discount}%`}</span>}
        </div>
        <div className="card_sticky card_sticky_type_top-right">
           <button className="card_favorite">
               <img src={saveimage} alt="Добавить в избранное" className="card_favorite-icon"/>
           </button>
        </div>
        <a href="/product" className="card_link">
          <img src={picture} alt={description} className="card_image"/>
          <div className="card_desc">
            <span className={discount !== 0 ? "card_oldprice" : "card_price"}>{price}&nbsp;₽</span>
            {discount !== 0 && <span className="card_price card_price_type_discount">{discount_price}&nbsp;₽</span>}
            <span className="card_weight">{weight}</span>
            <p className="card_name">{name}</p>

          </div>
        </a>
        <a href="#" className="card_cart btn btn_type_primary">В корзину</a>
    </div>
  );
};

export default Card;