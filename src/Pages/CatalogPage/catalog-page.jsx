import { useContext } from "react";
import CardList from "../../Components/CardList/cardList";
import Sort from "../../Components/Sort/Sort";
import { CardContext } from "../../Context/cardContext";


export const CatalogPage = () => {
   const {cards} = useContext(CardContext);
       return (
    <>
      <Sort/>
      <div className="content_cards">
         <CardList cards={cards}/>
      </div>
    </>
  );
};
