import { useSelector } from "react-redux";
import CardList from "../../Components/CardList/cardList";
import Sort from "../../Components/Sort/Sort";


export const CatalogPage = () => {
   const products = useSelector(state => state.products.data)
       return (
    <div className="container container_inner">
      <Sort/>
      <div className="content_cards">
         <CardList cards={products}/>
      </div>
    </div>
  );
};
