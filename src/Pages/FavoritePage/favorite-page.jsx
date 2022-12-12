import { useContext } from "react";
import CardList from "../../Components/CardList/cardList";
import { ContentHeader } from "../../Components/ContentHeader/content-header";
import Sort from "../../Components/Sort/Sort";
import { CardContext } from "../../Context/cardContext";




export const FavoritePage = () => {
    const {favorites} = useContext(CardContext);
  return (
    <>
      <ContentHeader title="Избранное"/>

   
      <Sort />
            <div className="content_cards">
              <CardList cards={favorites}/>
            </div>
    </>
  );
};