import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../../Context/ContextUser";
import Card from "../Card/card";
import { NotFound } from "../NotFound/NotFound";
import "./style.css";

const CardList = ({ cards }) => {
  const navigate = useNavigate();
  const {isLoading} = useContext(ContextUser);
  //  console.log(cards);
  return (
    <>
      {!cards.length && !isLoading && (
        <NotFound
          buttonText="Назад"
          title="По вашему запросу ничего не найдено"
          buttonAction={() => navigate(-1)}
        />
      )}
      <div className="cards">
        {cards.map((i, index) => (
          <Card key={i._id} {...i} />
        ))}
      </div>
    </>
  );
};

export default CardList;
