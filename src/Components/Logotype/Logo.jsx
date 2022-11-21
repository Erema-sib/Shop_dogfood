import './style.css';
import logotp from './logo.svg'



function Logo({className}) {
  return (
  <a href="/" className={className ? className : "logo"}>
    <img src={logotp} alt="Логотип магазина" className="logo_pic"/>
     
  </a>
  )
}

export default Logo;
