import React, { useState, useEffect } from 'react';
import CardList from '../CardList/cardList';
import Header from '../Header/header';
import Logo from '../Logotype/Logo';
import Search from '../Search/Search';
import './Apps.css';
//import datajson from '../../Assets/data.json';//отключаем, т.к. не нужен, используем api
import Footer from '../Footer/footer';
import SearchInfo from '../SearchInfo/SearchInfo';
import api from '../Utils/Api';
import useDebounce from '../../Hooks/useDebounce';
import { isLiked } from '../Utils/product_card';



function App() {
    const [cards, SetCards] = useState([]);
    const [searchQuery, setSQ] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const debounceSearchQuery = useDebounce(searchQuery, 400)

    //фильтрует данные и устанавливает новые карточки
    const handleRequest =() => {
      api.search(debounceSearchQuery)
        .then((searchResult) => {
          SetCards(searchResult)
        })
        .catch( error => console.log(error))
    }


    useEffect(() => {
      Promise.all([api.getUserInfo(), api.getProductList()])
      .then(([userData, productData]) => {
        setCurrentUser(userData)
        SetCards(productData.products)
        })
        .catch( error => console.log(error))
      },[])

    
    useEffect(()=> {
      handleRequest()
    }, [debounceSearchQuery])
  
    
    const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSQ(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
    .then((newuserData) => {
      setCurrentUser(newuserData)
    })
  }


  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProduct(product._id, liked)
    .then((newCard) => {
      const newProducts = cards.map(c => {
        return c._id === newCard._id ? newCard : c
      })
      SetCards(newProducts);
    })
  }

    
  
  return (
    <>
      <Header user = {currentUser} on_Update_User={handleUpdateUser}>
        <>
          
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
          
        </>
          
      </Header>
      <main className="content container">
      <SearchInfo searchCount={cards.length} searchText={searchQuery}/>
        <div className="content_cards">
        <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
        </div>
      </main>
      
      <Footer/>
     
  </>
  )
}

export default App;
