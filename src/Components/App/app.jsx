import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Logo from "../Logotype/Logo";
import Search from "../Search/Search";
import "./Apps.css";
import Footer from "../Footer/footer";
import SearchInfo from "../SearchInfo/SearchInfo";
import api from "../../Utils/Api";
import useDebounce from "../../Hooks/useDebounce";
import { CatalogPage } from "../../Pages/CatalogPage/catalog-page";
import { ProductPage } from "../../Pages/ProductPage/product-page";
import { useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ErrorNotFound } from "../../Pages/ErrorNotFound/error-not-found";
import { FaqPage } from "../../Pages/FAQPage/faq-page";
import { FavoritePage } from "../../Pages/FavoritePage/favorite-page";
import WindowModal from "../WindowModal/window-modal";
import RegistrationComp from "../RegistrationComp/registration";
import LoginComp from "../LoginComp/login";
import PasswodrdRes from "../PasswordResettt/password-res";
import HomePage from "../../Pages/HomePage/home-page";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../storage/products/productsSlice";
import { fetchUser, userTokenCheck } from "../../storage/user/userSlice";
import { LockProtecRoute } from "../LockProtecRoute/lock-route";
import { CartPage } from "../../Pages/CartPage/cart-page";

function App() {
  const [cards, SetCards] = useState([]);
  const [searchQuery, setSQ] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 400);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const bgLocation = location.state?.bgLocation;
  const firstPath = location.state?.firstPath;
  const loggedIn = useSelector((state) => state.user.loggedIn);

  //фильтрует данные и устанавливает новые карточки
  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api
      .search(searchQuery)
      .then((searchResult) => {
        SetCards(searchResult);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const userData = dispatch(userTokenCheck(token));
    if (token) {
      userData.then(() => {
        dispatch(fetchProducts());
      });
    }
  }, [dispatch, loggedIn]);

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  const handleFormSubmit = (inputText) => {
    navigate("/");
    setSQ(inputText);
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSQ(inputValue);
  };

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newuserData) => {
      setCurrentUser(newuserData);
    });
  }

  return (
    <>
      <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Routes>
            <Route
              path="/catalog"
              element={
                <Search
                  onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              }
            />
            <Route path="*" element={<></>} />
          </Routes>
        </>
      </Header>
      <main className="content">
        <SearchInfo searchText={searchQuery} />
        <Routes
          location={
            (bgLocation && { ...bgLocation, pathname: firstPath }) || location
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="/catalog"
            element={
              <LockProtecRoute>
                <CatalogPage />
              </LockProtecRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <LockProtecRoute>
                <CartPage />
              </LockProtecRoute>
            }
          />
          <Route
            path="/product/:productId/"
            element={<ProductPage isLoading={isLoading} />}
          />
          <Route path="/faq" element={<FaqPage />} />

          <Route
            path="/favorites"
            element={
              <LockProtecRoute>
                <FavoritePage />
              </LockProtecRoute>
            }
          />

          <Route
            path="/login"
            element={
              <LockProtecRoute onlyUnAuth>
                <LoginComp />
              </LockProtecRoute>
            }
          />

          <Route
            path="/register"
            element={
              <LockProtecRoute onlyUnAuth>
                <RegistrationComp />
              </LockProtecRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <LockProtecRoute onlyUnAuth>
                <PasswodrdRes />
              </LockProtecRoute>
            }
          />

          <Route path="*" element={<ErrorNotFound />} />
        </Routes>

        {bgLocation && (
          <Routes>
            <Route
              path="/login"
              element={
                <LockProtecRoute onlyUnAuth>
                  <WindowModal>
                    <LoginComp />
                  </WindowModal>
                </LockProtecRoute>
              }
            />

            <Route
              path="/register"
              element={
                <LockProtecRoute onlyUnAuth>
                  <WindowModal>
                    <RegistrationComp />
                  </WindowModal>
                </LockProtecRoute>
              }
            />

            <Route
              path="/reset-password"
              element={
                <LockProtecRoute onlyUnAuth>
                  <WindowModal>
                    <PasswodrdRes />
                  </WindowModal>
                </LockProtecRoute>
              }
            />
          </Routes>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
