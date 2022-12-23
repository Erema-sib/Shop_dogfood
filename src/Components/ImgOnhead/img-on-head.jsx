import { Link } from "react-router-dom";
import "./style.css";
import banner from "./image/banner.png";
import arrow1 from "./image/arrow 1.svg";


export const  ImgOnhead = () => {
    return (
        <div className="banner">
            <div className="container banner_container">
                <div className="lefttt">
                    <h1 className="title">Крафтовые лакомства для собак</h1>
                    <p className="subtitleee">Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
                    <Link to="catalog" className="link_btn">Каталог <img src={arrow1} alt="arrow"/></Link>
             </div>
                <div className="righttt">
                    <img src={banner} alt="Заглавное изображение"/>

                </div>
            </div>
         </div>
    )
}