import BannerInfo from "../../Components/BannerInfo/banner-info";
import { ImgOnhead } from "../../Components/ImgOnhead/img-on-head";
import banner_product from "./image/banner_2.jpg";
import banner_sale from "./image/banner.jpg";

const HomePage = () => {
    const goods = [
        {
            id: 1,
            image: './cards/img1.png',
            old_price: '1200 ₽',
            price: '840 ₽',
            quantity: '1 шт',
            text: 'Рога оленя для собак весом от 10 до 30 кг. Размер L',
        },
        {
            id: 2,
            image: './cards/img2.png',
            price: '450 ₽',
            quantity: '200 мл',
            text: 'Сельдевое масло',
        },
        {
            id: 3,
            image: './cards/img3.png',
            old_price: '550 ₽',
            price: '495 ₽',
            quantity: '100 г',
            text: 'Бублик из бычьего корня',
        },
        {
            id: 4,
            image: './cards/img4.png',
            price: '240 ₽',
            quantity: '1 шт',
            text: 'Лопаточный хрящ говяжий для собак',
        },
    ];

    return (
        <>
        <ImgOnhead/>
        <BannerInfo extraClass="banner_big" 
                    title="Подарок за первый заказ" 
                    subtitle="Лёгкое говяжье - пластины"
                    backgr={banner_sale}
                    colorBg="rgb(255, 143, 39)"
                   />

        <BannerInfo extraClass="banner_middle"
                    title="Наборы"
                    subtitle="для дрессировки"
                    backgr={banner_product}
                    price="от 840 ₽"
                    colorBg="#D8A217"/>
        </>
    )
}


export default HomePage;