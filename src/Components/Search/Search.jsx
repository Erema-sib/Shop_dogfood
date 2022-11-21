import './style.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';




function Search({onSubmit, onInput}) {
  const handleInput =(e) => {
      onInput(e.target.value)
  }
  return (
    
    <form className="search" onSubmit={onSubmit}  >
      <input type="text" className="search_input" placeholder="Поиск по магазину" onInput={handleInput}/>
    <button className="search_btn">
       <SearchIcon/>
       {false && <CloseIcon/>}
     

    </button>
  </form>
  
 
    
  
  )
}

export default Search;