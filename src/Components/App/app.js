import React, { useState, useEffect } from 'react';
import CardList from '../CardList/cardList';
import Header from '../Header/header';
import Logo from '../Logotype/Logo';
import Search from '../Search/Search';
import './Apps.css';
import datajson from '../../Assets/data.json';
import Footer from '../Footer/footer';
import SearchInfo from '../SearchInfo/SearchInfo';





function App() {
    const [cards, SetCards] = useState(datajson);
    const [sQ, setSQ] = useState("");
    

    //фильтрует данные и устанавливает новые карточки
    const handleRequest =() => {
      const filterCards = datajson.filter(i => i.name.toUpperCase().includes(sQ.toUpperCase()));
      SetCards(prevState => filterCards);
    }

    
    useEffect(()=>{
      handleRequest()
    },[sQ])
  
    
    const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSQ(inputValue);
  }

    return (
    <>
      <Header>
        <>
          
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
          
        </>
          
      </Header>
      <main className="content container">
      <SearchInfo searchCount={cards.length} searchText={sQ}/>
        
      
      <div className="content_cards">
        <CardList goods={cards}/>
        
      </div>
      </main>
      <Footer/>
     
  </>
  )
}

export default App;
