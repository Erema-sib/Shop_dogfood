import { useSelector } from "react-redux";
import CardList from "../../Components/CardList/cardList";
import { ContentHeader } from "../../Components/ContentHeader/content-header";
import Sort from "../../Components/Sort/Sort";

export const FavoritePage = () => {
  const favorites = useSelector((state) => state.products.favProds);
  return (
    <div className="container container_inner">
      <ContentHeader title="Избранное" />

      <Sort />
      <div className="content_cards">
        <CardList cards={favorites} />
      </div>
    </div>
  );
};
