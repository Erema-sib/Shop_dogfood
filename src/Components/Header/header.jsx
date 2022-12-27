import './style.css';
import { ReactComponent as FavoriteImg } from "./image/img.svg"
import { ReactComponent as LogoutIcon } from "./image/logout.svg";
import { ReactComponent as CartIcon } from "./image/корзина.svg";
import { ReactComponent as ProfileIcon } from "./image/profile.svg";
import { ReactComponent as UserIcon } from "./image/user.svg";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storage/user/userSlice';


function Header({children}) {
  const favorites = useSelector(state => state.products.favProds);
  const user = useSelector(state => state.user.data);
  const location = useLocation();
  const dispatch = useDispatch();

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

            
            { !user && <Link to= "/login" state={{bgLocation: location, firstPath: location.pathname}} className="iconsMenuItem">
                 <UserIcon/>
                       Войти
            </Link>
            }
            
            {user && 
            <>
            <Link to= "/profile" className="iconsMenuItem">
                 <ProfileIcon/>
                       {user.name}
            </Link>
            
             <Link to= "/" className="iconsMenuItem" onClick={() => dispatch(logout())}>
                 <LogoutIcon/>
                       Выйти
            </Link>
            </>
            }  
        </div>
      </div>
    </div>
     
  </header>
  )
}

export default Header;
