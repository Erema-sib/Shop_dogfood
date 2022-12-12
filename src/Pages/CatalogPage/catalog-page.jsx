import { useContext } from "react";
import CardList from "../../Components/CardList/cardList";
import Sort from "../../Components/Sort/Sort";
import { CardContext } from "../../Context/cardContext";


const tabs = [
	{
	  id: "cheap",
	  title: "Сначала дешёвые",
	},
	{
	  id: "low",
	  title: "Сначала дорогие",
	},
	{
	  id: "sale",
	  title: "По скидке",
	},
  ];


export const CatalogPage = () => {
   const {cards} = useContext(CardContext);
       return (
    <>
      <Sort tabs={tabs}/>
      <div className="content_cards">
         <CardList cards={cards}/>
      </div>
    </>
  );
};
