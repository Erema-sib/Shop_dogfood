import "./style.css";
import { ReactComponent as FavoriteImg } from "./image/img.svg";
import { ReactComponent as LogoutIcon } from "./image/logout.svg";
import { ReactComponent as CartIcon } from "./image/корзина.svg";
import { ReactComponent as ProfileIcon } from "./image/profile.svg";
import { ReactComponent as UserIcon } from "./image/user.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../storage/user/userSlice";
import { cartInfoSel } from "../../storage/cart/cartSlice";

function Header({ children }) {
  const favorites = useSelector((state) => state.products.favProds);
  const user = useSelector((state) => state.user.data);
  const state = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();

  const { totalCount } = cartInfoSel(state);

  return (
    <header className="header">
      <div className="container">
        <div className="header_wrapper">
          {children}
          <div className="iconsMenu">
            <Link className="favoritesLink" to={{ pathname: "/favorites" }}>
              <FavoriteImg />
              {favorites.length !== 0 && (
                <span className="iconBubble">{favorites.length}</span>
              )}
            </Link>

            <Link className="favoritesLink" to={{ pathname: "/cart" }}>
              <CartIcon />
              {totalCount !== 0 && (
                <span className="iconBubble">{totalCount}</span>
              )}
            </Link>

            {!user && (
              <Link
                to="/login"
                state={{ bgLocation: location, firstPath: location.pathname }}
                className="iconsMenuItem"
              >
                <UserIcon />
                Войти
              </Link>
            )}

            {user && (
              <>
                <Link to="/profile" className="iconsMenuItem">
                  <ProfileIcon />
                  {user.name}
                </Link>

                <Link
                  to="/"
                  className="iconsMenuItem"
                  onClick={() => dispatch(logout())}
                >
                  <LogoutIcon />
                  Выйти
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
