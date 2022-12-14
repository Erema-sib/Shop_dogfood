import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Logo from "../Logotype/Logo";
import Search from "../Search/Search";
import "./Apps.css";
import Footer from "../Footer/footer";
import SearchInfo from "../SearchInfo/SearchInfo";
import api from "../Utils/Api";
import useDebounce from "../../Hooks/useDebounce";
import { isLiked } from "../Utils/product_card";
import { CatalogPage } from "../../Pages/CatalogPage/catalog-page";
import { ProductPage } from "../../Pages/ProductPage/product-page";
import { useCallback } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ErrorNotFound } from "../../Pages/ErrorNotFound/error-not-found";
import { ContextUser } from "../../Context/ContextUser";
import { CardContext } from "../../Context/cardContext";
import { FaqPage } from "../../Pages/FAQPage/faq-page";
import { FavoritePage } from "../../Pages/FavoritePage/favorite-page";
import RegistrationForm from "../Form/form-registr";
import WindowModal from "../WindowModal/window-modal";
import { FormModal } from "../FormModal/form-modal";

function App() {
  const [cards, SetCards] = useState([]);
  const [searchQuery, setSQ] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 400);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState("");


  const [isOpenModalWin, setisOpenModalWin] = useState(false);

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
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getProductList()])
      .then(([userData, productData]) => {
        setCurrentUser(userData);
        SetCards(productData.products);
        const favoriteProducts = productData.products.filter(i => isLiked(i.likes, userData._id));
        setFavorites(favoriteProducts)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser._id);
      return api.changeLikeProduct(product._id, liked).then((updateCard) => {
        const newProducts = cards.map((c) => {
          return c._id === updateCard._id ? updateCard : c;
        });

        if(!liked) {
           setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }
        
        SetCards(newProducts);
        return updateCard;
      });
    },
    [currentUser._id, cards]
  );

  
  // const addContact = useCallback((formData) => {
  //  console.log(formData);
  // }, [])

  
  //Условия сортировки карточек
    const sortProducts = (currentSort) => {
    console.log(currentSort);
    switch (currentSort) {
      case "low":
        SetCards(cards.sort((a,b) => b.price - a.price));
      break;

      case "cheap":
        SetCards(cards.sort((a,b) => a.price - b.price));
      break;

      case "sale":
        SetCards(cards.sort((a,b) => b.discount - a.discount));
      break;

      default:
        SetCards(cards.sort((a,b) => a.price - b.price));
        break;
    }
  }
  
  
  return (
    <ContextUser.Provider value={{ user: currentUser, isLoading }}>
      <CardContext.Provider value={{ cards, favorites, currentSort, handleLike: handleProductLike, onSortProducts: sortProducts, setCurrentSort }}>
        <FormModal/>
        <Header>
          <>
            <Logo className="logo logo_place_header" href="/" />
            <Routes>
              <Route
                path="/"
                element={
                  <Search
                    onSubmit={handleFormSubmit}
                    onInput={handleInputChange}
                  />
                }
              />
            </Routes>
          </>
        </Header>
        <main className="content container">
          <SearchInfo searchText={searchQuery} />
          <Routes location={(bgLocation && {...bgLocation, pathname: firstPath}) || location}>
            <Route index element={
            <CatalogPage/>
            } />
            <Route
              path="/product/:productId/"
              element={<ProductPage isLoading={isLoading} />}
            />
            <Route path="/faq" element={<FaqPage/>}/>
            <Route path="/favorites" element={<FavoritePage/>}/>

            <Route path="/login" element={
               <>
                        Авторизация
                        <Link to="/register">Зарегистрироваться</Link>
               </>
            }/>


            <Route path="/register" element={
               <WindowModal>
                        Регистрация
                        <Link to="/login">Войти</Link>
               </WindowModal>
            }/>

            <Route path="*" element={<ErrorNotFound/>}/>
          </Routes>

          {bgLocation && (
            <Routes>
                <Route path="/login" element={
               <WindowModal>
                        Авторизация
                        <Link to="/register" replace={true} state={{bgLocation: location, firstPath}}>Зарегистрироваться</Link>
               </WindowModal>
            }/>


            <Route path="/register" element={
               <WindowModal>
                        Регистрация
                        <Link to="/login" replace={true} state={{bgLocation: location, firstPath}}>Войти</Link>
               </WindowModal>
            }/>
            </Routes>
          )}
        </main>

        <Footer />
      </CardContext.Provider>
    </ContextUser.Provider>
  );
}

export default App;
