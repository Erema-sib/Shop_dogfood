import { useContext } from 'react';
import { CardContext } from '../../Context/cardContext';
import Card from '../Card/card';
import './style.css';




const CardList = () => {
  const {cards} = useContext(CardContext);
  return (
    <div className="cards">
          {

          cards.map(( i, index) => <Card key={i._id} {...i}/>)

          // 2ой вариант 
          // datajson.map(function (i) {
          //   return (
          //     <Card {...i} /> //спред оператор ...i берёт пропсы из переменной Card и автоматически подставляет в разметку  со вcеми данными
          }      
        </div>
  
     );
};

export default CardList;