import './style.css';
import { ReactComponent as FavoriteImg } from "./image/img.svg"
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../Context/cardContext';



function Header({children, user, on_Update_User}) {
  const {favorites} = useContext(CardContext);
  const location = useLocation();

    return (
       <header className="header">
         <div className="container">
         <div className="header_wrapper">
        {children}
        <div className="iconsMenu">
            <Link className="favoritesLink" to="/favorites">
                 <FavoriteImg/>
                 {favorites.length !== 0 && <span className="iconBubble">{favorites.length}</span>}
            </Link>
            <Link to= "/login" state={{bgLocation: location, firstPath: location.pathname}}>Войти</Link>
        </div>
      </div>
    </div>
     
  </header>
  )
}

export default Header;
