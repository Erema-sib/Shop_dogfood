import cn from "classnames";
import s from "./index.module.css";
import { useEffect, useState } from "react";
import { ReactComponent as StarIcon } from "./star.svg";
import { useCallback } from "react";

export const RatingStar = ({
  isEditable = false,
  rating,
  setRating = null,
  ...props
}) => {
  const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));

  

  const constructRating = useCallback((currentRating) => {
    const updateArray = ratingArray.map((ratingElement, index) => {
      return (
        <StarIcon
          className={cn(s.star, {[s.filled]: index < currentRating,
                                 [s.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(index + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => changeRating(index + 1)}
        />
      );
    });
    setRatingArray(updateArray);
  },[rating,]);

  const changeDisplay = (rating) => {
         if(!isEditable) return
         constructRating(rating)
    }


    const changeRating = (rating) => {
    if(!isEditable || !setRating) return 
     setRating(rating)  
    }

    useEffect(() => {
        constructRating(rating)
      }, [rating, constructRating]);

  return (
    <div>
      {ratingArray.map((star, item) => (
        <span key={item}>{star}</span>
      ))}
    </div>
  );
};