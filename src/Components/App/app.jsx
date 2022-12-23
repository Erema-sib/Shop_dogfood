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
import { useDispatch } from "react-redux";
import { fetchChangeLikeProduct, fetchProducts } from "../../storage/products/productsSlice";
import { fetchUser } from "../../storage/user/userSlice";

function App() {
  const [cards, SetCards] = useState([]);
  const [searchQuery, setSQ] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 400);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState("");
  const dispatch = useDispatch();


  const location = useLocation();

  const bgLocation = location.state?.bgLocation;
  const firstPath = location.state?.firstPath;

  
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
       const userData = dispatch(fetchUser());
       userData.then(() => {
         dispatch(fetchProducts())
       });
  },[dispatch])

  
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
                  <Search onSubmit={handleFormSubmit}
                          onInput={handleInputChange}
                  />
                }
              />
              <Route path="*" 
              element={<></>}
              />
            </Routes>
          </>
        </Header>
        <main className="content">
          <SearchInfo searchText={searchQuery} />
          <Routes location={(bgLocation && {...bgLocation, pathname: firstPath}) || location}>
          <Route index element={
            <HomePage/>
            } />
            <Route path="/catalog" element={
            <CatalogPage/>
            }/>
            <Route
              path="/product/:productId/"
              element={<ProductPage isLoading={isLoading} />}
            />
            <Route path="/faq" element={
            <FaqPage/>}/>
            
            <Route path="/favorites" element={
            <FavoritePage/>}/>

            <Route path="/login" element={
               <LoginComp/>
            }/>


            <Route path="/register" element={
                        <RegistrationComp/>
            }/>

            <Route path="/reset-password" element={
                        <PasswodrdRes/>
            }/>

            <Route path="*" element={<ErrorNotFound/>}/>
          </Routes>

          {bgLocation && (
            <Routes>
                <Route path="/login" element={
               <WindowModal>
                        <LoginComp/>
               </WindowModal>
            }/>


            <Route path="/register" element={
               <WindowModal>
                        <RegistrationComp/>
               </WindowModal>
            }/>

            <Route path="/reset-password" element={
               <WindowModal>
                        <PasswodrdRes/>
               </WindowModal>
            }/>
            </Routes>
          )}
        </main>
        <Footer/>
      </>
  );
}

export default App;
