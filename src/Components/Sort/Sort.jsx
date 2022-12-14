import "./style.css";
import cn from "classnames";
import { useContext } from "react";
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

const Sort = () => {
  const {currentSort, setCurrentSort, onSortProducts} = useContext(CardContext);


const handleClick = (e, tab) => {
	e.preventDefault(); 
	setCurrentSort(tab.id);
	onSortProducts(tab.id);
}
	return (
		<div className="sort content_sort">
             {tabs.map(tab => (
				<div className={cn("sort_link", {"sort_link_selected": currentSort === tab.id})} 
				key={tab.id} 
				id={tab.id}
				>
				<a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>	
				</div>
			 ))}
		</div>

	);
};

export default Sort;