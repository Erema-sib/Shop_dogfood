import "./style.css";
import { ReactComponent as SearchIcon } from "./ic-search.svg";
import { ReactComponent as CloseIcon } from "./ic-close-input.svg";
import { useState } from "react";

function Search({ onSubmit: onSubmit, onInput }) {
  const [inputText, setInputText] = useState("");
  
  const handleInput = (e) => {
    setInputText(e.target.value);
    onInput && onInput(e.target.value);
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputText);
  }

  const handleClearInput = () => {
    setInputText("");
    onInput && onInput("");
  };

  return (
    <form className="search" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputText}
        className="search_input"
        placeholder="Поиск по магазину"
        onInput={handleInput}
      />
      <button className="search_btn">
        {!inputText && <SearchIcon />}
        {inputText && <CloseIcon onClick={handleClearInput} />}
      </button>
    </form>
  );
}

export default Search;
