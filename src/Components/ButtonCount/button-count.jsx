import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

export function ButtonCount({amount = 0, increment, decrement, countChange}) {
      const [value, setValue] = useState(amount);

      useEffect(() => {
        setValue(amount)
      },[amount])

      return (
        <div className="wrap">
        <button className="minus" onClick={() => {
            decrement && decrement();
            setValue(prevState => prevState -1)
        }}
        disabled={value <= 1}
        >-</button>
        <input type="number" value={value} className="num" onChange={(e) => {
            const countInCart = Number(e.target.value);
            if (countInCart > 0) {
                countChange && countChange(countInCart);
                setValue(countInCart);
            } else {
                countChange && countChange(1);
                setValue(1);
            }
        }
        }/>
        <button className="plus" onClick={() => {
            decrement && increment();
            setValue(prevState => prevState +1)
        }}>+</button>
      </div> 
      )
}