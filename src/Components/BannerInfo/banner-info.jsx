import cn from "classnames";
import z from "./index.module.css";


const BannerInfo = ({title, subtitle, backgr, price, extraClass, colorBg}) => {
    return (
        <div className={cn(z.banner, {[z[extraClass]]: !!extraClass})} style={{backgroundImage: `url(${backgr})`, backgroundColor: colorBg}}>
              <h2 className={z.title}>{title}</h2>
              <h2 className={z.subtitle}>{subtitle}</h2>
              <span className={z.price}>{price}</span>
        </div>
    )
}

export default BannerInfo;