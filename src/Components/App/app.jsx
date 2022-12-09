import React, { useState, useEffect } from "react";
import CardList from "../CardList/cardList";
import Header from "../Header/header";
import Logo from "../Logotype/Logo";
import Search from "../Search/Search";
import "./Apps.css";
//import datajson from '../../Assets/data.json';//отключаем, т.к. не нужен, используем api
import Footer from "../Footer/footer";
import SearchInfo from "../SearchInfo/SearchInfo";
import Sort from "../Sort/Sort";
import api from "../Utils/Api";
import useDebounce from "../../Hooks/useDebounce";
import { isLiked } from "../Utils/product_card";
import Spinner from "../Spinner";
import { CatalogPage } from "../../Pages/CatalogPage/catalog-page";
import { ProductPage } from "../../Pages/ProductPage/product-page";
import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ErrorNotFound } from "../../Pages/ErrorNotFound/error-not-found";
import { ContextUser } from "../../Context/ContextUser";
import { CardContext } from "../../Context/cardContext";



function App() {
  const [cards, SetCards] = useState([]);
  const [searchQuery, setSQ] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 400);
  const navigate = useNavigate()

  //фильтрует данные и устанавливает новые карточки
 const handleRequest = useCallback(() => {
    setIsLoading(true);
    api
      .search(searchQuery)
      .then((searchResult) => {
        SetCards(searchResult)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      })
  },[searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getProductList()])
      .then(([userData, productData]) => {
        setCurrentUser(userData);
        SetCards(productData.products);
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

  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id);
    return api.changeLikeProduct(product._id, liked).then((updateCard) => {
      const newProducts = cards.map((c) => {
        return c._id === updateCard._id ? updateCard : c;
      });
      SetCards(newProducts);
      return updateCard;
    });
  },[currentUser._id,] )

 
 return (
    <ContextUser.Provider value={{user:currentUser}}>
      <CardContext.Provider value={{cards, handleLike:handleProductLike}}>
      <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Routes>
          <Route path="/" element={
            <Search onSubmit={handleFormSubmit}  onInput={handleInputChange}/>
          }/>
          </Routes>
        </>
      </Header>
      <main className="content container">
        <SearchInfo  searchText={searchQuery} />
        <Routes>
          <Route index element={
             <CatalogPage isLoading={isLoading}/>
          }/>
        <Route path="/product/:productId/" element = {
          <ProductPage
          isLoading={isLoading}
          />
        }/>
        <Route path="*" element={<ErrorNotFound/>}/>
        </Routes>
      </main>

      <Footer />
      </CardContext.Provider>
    </ContextUser.Provider>
  );
}

export default App;
