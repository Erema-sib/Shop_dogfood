/* eslint-disable jsx-a11y/anchor-is-valid */

import cn from "classnames";
import { calcDiscountPrice, isLiked, createMarkup } from "../Utils/product_card";
import "./style.css";
import { ReactComponent as Save } from "./image/save.svg";
import truck from "./image/truck.svg";
import quality from "./image/quality.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextUser } from "../../Context/ContextUser";

export const Product = ({
  onProductLike,
  pictures,
  likes = [],
  reviews,
  tags,
  name,
  price,
  discount,
  description,
  wight,
  _id,
}) => {
  const {user: currentUser} = useContext(ContextUser);

  const navigate = useNavigate();
  const discount_price = calcDiscountPrice(price, discount);
  const isLike = isLiked(likes, currentUser?._id);
  const descriptionHTML = createMarkup(description);
  
  return (
    <>
      <div>
        <a href="#" className="button-back" onClick={() => navigate(-1)}>
          Назад
        </a>
        <h1 className="productTitle">{name}</h1>
        <div>
          <span>Артикул:</span> <b>1118907</b>
        </div>
      </div>
      <div className="product">
        <div className="imgWrapper">
          <img src={pictures} alt={`Здесь должно быть фото ${name}`} />
        </div>
        <div className="desc">
          <span className={discount ? "oldPrice" : "price"}>
            {price}&nbsp;₽
          </span>
          {discount && (
            <span className={cn("price", "card_price_type_discount")}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className="btnWrap">
            <div className="left">
              <button className="minus">-</button>
              <span className="num">0</span>
              <button className="plus">+</button>
            </div>
            <a href="#" className={cn("btn", "btn_type_primary", "cart")}>
              В корзину
            </a>
          </div>
          <button className={cn("favorite", {"favoriteActive" : isLike})} onClick={onProductLike}>
            <Save/>
            <span>{isLike ? "В избранном" : "В избранное"}</span>
          </button>
          <div className="delivery">
            <img src={truck} alt="truck"/>
            <div className="right">
              <h3 className="name">Доставка по всему миру!</h3>
              <p className="text">
                Доставка курьером - <span className="bold">от 399 Р</span>
              </p>
            </div>
          </div>
          <div className="delivery">
            <img src={quality} alt="quality"/>
            <div className="right">
              <h3 className="name">Международный сертификат качества.</h3>
              <p className="text">
                Проверка качества в  <span className="bold">SISSAC</span> лабораториях.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="box">
        <h2 className="Title">
          Описание
        </h2>
        <p className="subtitle" dangerouslySetInnerHTML = {descriptionHTML}></p>
        <h2 className="title">Характеристики</h2>
        <div className="grid">
					<div className="naming">Вес</div>
					<div className="description">1 шт 120-200 грамм</div>
					<div className="naming">Цена</div>
					<div className="description">490 Р за 100 грамм</div>
					<div className="naming">Польза</div>
					<div className="description">
						<p>
							Большое содержание аминокислот и микроэлементов оказывает
							положительное воздействие на общий обмен веществ собаки.
						</p>
						<p>Способствуют укреплению десен и жевательных мышц.</p>
						<p>
							Развивают зубочелюстной аппарат, отвлекают собаку во время смены
							зубов.
						</p>
						<p>
							Имеет цельную волокнистую структуру, при разжевывание получается
							эффект зубной щетки, лучше всего очищает клыки собак.
						</p>
						<p>Следует учесть высокую калорийность продукта.</p>
					</div>
				</div>  
      </div>
    </>
  );
};

export default Product;
