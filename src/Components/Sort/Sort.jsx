import "./style.css";
import cn from "classnames";

const Sort = ({currentSort, tabs=[], onChangeSort}) => {
const handleClick = (e, tab) => {
	e.preventDefault(); 
	onChangeSort(tab.id)
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