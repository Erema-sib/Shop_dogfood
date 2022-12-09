import CardList from "../../Components/CardList/cardList";
import Sort from "../../Components/Sort/Sort";
import Spinner from "../../Components/Spinner";




export const CatalogPage = ({isLoading}) => {
  return (
    <>
      <Sort />
      <div className="content_cards">
        {isLoading ? <Spinner /> : <CardList/>}
      </div>
    </>
  );
};
