import React from "react";
import "./style.css";
import Logo from '../Logotype/Logo'
import telegram from "./image/telegram.svg";
import instagram from "./image/instagram.svg";
import viber from "./image/viber.svg";
import whatsapp from "./image/whatsapp.svg";
import vk from "./image/vk.svg";




const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer_wrapper">
					<div className="footer_col">
						<Logo className="logo footer_logo" href="#" title="Логотип" aria-hidden={true} />
						<p className="footer_copyright">© «Интернет-магазин DogFood.ru»</p>
					</div>
					<div className="footer_col">
						<nav className="menu-bottom">
							<a href="/catalogue" className="menu-bottom_item">Каталог</a>
							<a href="/catalogue" className="menu-bottom_item">Акции</a>
							<a href="/catalogue" className="menu-bottom_item">Новости</a>
							<a href="/catalogue" className="menu-bottom_item">Отзывы</a>
						</nav>
					</div>
					<div className="footer_col">
						<nav className="menu-bottom">
							<a href="/catalogue" className="menu-bottom_item">Оплата и доставка</a>
							<a href="/catalogue" className="menu-bottom_item">Часто спрашивают</a>
							<a href="/catalogue" className="menu-bottom_item">Обратная связь</a>
							<a href="/catalogue" className="menu-bottom_item">Контакты</a>
						</nav>
					</div>
					<div className="footer_col">
						<div className="contacts">
							<p className="contacts_title">Мы на связи</p>
							<a className="contacts_tel contacts__link" href="tel:8999000000">8 (999) 00-00-00</a>
							<a className="contacts_mail contacts_link" href="mailto:hordog.ru@gmail.com">dogfood.ru@gmail.com</a>
							<ul className="socials contacts_socials">
								<li className="socials_item">
									<a className="socials_link" href="/#">
										<img src={telegram} alt="telegram" className="socials_icon" />
									</a>
								</li>

								<li className="socials_item">
									<a className="socials_link" href="/#">
										<img src={whatsapp} alt="whatsapp" className="socials_icon" /></a>
								</li>
								
								<li className="socials_item">
									<a className="socials_link" href="/#">
										<img src={viber} alt="viber" className="socials_icon" /></a>
								</li>
								
								<li className="socials_item">
									<a className="socials_link" href="/#">
										<img src={instagram} alt="instagram" className="socials_icon" /></a>
								</li>
								
								<li className="socials_item">
									<a className="socials_link" href="/#">
										<img src={vk} alt="vk" className="socials_icon" /></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
