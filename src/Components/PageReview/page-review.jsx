/* eslint-disable react/jsx-pascal-case */

import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/form";
import FormInput from "../FormInput/form-input";
import Form_Button from "../Form_Button/form-button";
import { RatingStar } from "../RatingStar/rating";
import { INITIAL_Value_RAT, VLDT_CNF } from "../../Utils/regular";
import { useDispatch } from "react-redux";
import { fetchCreateReview } from "../../storage/singleProduct/singleProductSlice";

const PageReview = ({ title = "Отзыв о товаре", productId, setProduct }) => {
  const {register, handleSubmit, formState: { errors }, reset} = useForm({ mode: "onBlur" });
  const [rating, setRating] = useState(INITIAL_Value_RAT);
  const dispatch = useDispatch();

  const sendReviewProduct = (body) => {
    dispatch(fetchCreateReview({productId, data: {...body, rating}}))
            .then(() => {
              reset();
              setRating(INITIAL_Value_RAT)
            })
  };


  const textReview = register("text", {
    required: {
      value: true,
      message: VLDT_CNF.requiredMessage,
    },
  });

  return (
    <Form title={title} handleFormSubmit={handleSubmit(sendReviewProduct)}>
      <RatingStar rating={rating} isEditable setRating={setRating} />

      <FormInput
        {...textReview}
        id="text"
        typeinp="textarea"
        placeholder="Напишите свой отзыв о продукте"
      />
      {errors?.email && (
        <p className="errorMessage">{errors?.email?.message}</p>
      )}

      <Form_Button type="submit" color="yellow">
        Отправить отзыв
      </Form_Button>
    </Form>
  );
};

export default PageReview;
