import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Card/card";
import { NotFound } from "../NotFound/NotFound";
import "./style.css";

const CardList = ({ cards }) => {
  const navigate = useNavigate();
  const loading = useSelector( state => state.products.loading)
  return (
    <>
      {!cards.length && !loading && 
        <NotFound
          buttonText="Назад"
          title="По вашему запросу ничего не найдено"
          buttonAction={() => navigate(-1)}
        />
      }
      <div className="cards">
        {cards.map( (i, index) => 
          <Card key={i._id} {...i} />
        )}
      </div>
    </>
  );
};

export default CardList;
