import z from "./index.module.css";
import cn from "classnames";
import { calcDiscountPrice } from "../../Utils/product_card";

const ProductPrice = ({ discount, price = "big", type, align = "left"}) => {
    const discount_price = calcDiscountPrice(price, discount);
    return (
        <div className={cn({[z[`${type}Price`]]: type}, z.priceWrap)}>
            <span className={cn({[z.oldPrice]: discount, [z.price]: !discount, [z[align]]: align})}>{price}&nbsp;Р</span>
            {discount !== 0 && <span className={cn(z.price, z.priceDiscount)}>{discount_price}&nbsp;Р</span>}
        </div>
    )
}


export default ProductPrice;