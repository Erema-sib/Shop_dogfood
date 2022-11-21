import Card from '../Card/card';
import './style.css';




const CardList = ({goods}) => {
  return (
    <div className="cards">
          {

            goods.map(( i, index) => <Card key={index} {...i}/>)

          // 2ой вариант 
          // datajson.map(function (i) {
          //   return (
          //     <Card {...i} /> //спред оператор ...i берёт пропсы из переменной Card и автоматически подставляет в разметку  со вcеми данными
          }      
        </div>
  
     );
};

export default CardList;