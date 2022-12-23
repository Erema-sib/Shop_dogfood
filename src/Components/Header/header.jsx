import './style.css';
import { ReactComponent as FavoriteImg } from "./image/img.svg"
import { ReactComponent as LogoutIcon } from "./image/logout.svg";
import { ReactComponent as CartIcon } from "./image/корзина.svg";
import { ReactComponent as ProfileIcon } from "./image/profile.svg";
import { ReactComponent as UserIcon } from "./image/user.svg";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';



function Header({children, user, on_Update_User}) {
  const favorites = useSelector(state => state.products.favProds)
  const location = useLocation();

    return (
       <header className="header">
         <div className="container">
         <div className="header_wrapper">
        {children}
        <div className="iconsMenu">
            <Link className="favoritesLink" to={{pathname:"/favorites"}}>
                 <FavoriteImg/>
                 {favorites.length !== 0 && <span className="iconBubble">{favorites.length}</span>}
            </Link>

            <Link className="favoritesLink" to={{pathname:"/cart"}}>
                 <CartIcon/>
                 {favorites.length !== 0 && <span className="iconBubble">{favorites.length}</span>}
            </Link>

            <Link to= "/login" state={{bgLocation: location, firstPath: location.pathname}} className="iconsMenuItem">
                 <UserIcon/>
                       Войти
            </Link>

            <Link to= "/profile" className="iconsMenuItem">
                 <ProfileIcon/>
                       Олег
            </Link>

            <Link to= "/" className="iconsMenuItem">
                 <LogoutIcon/>
                       Выйти
            </Link>
            
        </div>
      </div>
    </div>
     
  </header>
  )
}

export default Header;
