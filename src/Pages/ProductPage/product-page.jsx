import Spinner from "../../Components/Spinner/index";
import { useContext, useEffect, useState } from "react";
import api from "../../Components/Utils/Api"
import Product from "../../Components/Product/product";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../../Components/NotFound/NotFound";
import { ContextUser } from "../../Context/ContextUser";
import { CardContext } from "../../Context/cardContext";
import { useApi } from "../../Hooks/useApi";


// const ID_PRODUCT = "622c77e877d63f6e70967d22";

export const ProductPage = () => {
  const { productId } = useParams();
  const {handleLike} = useContext(CardContext);


  const handleGetProduct = useCallback(() => api.getProductById(productId),[productId]);

  const {data: product, setData: setProduct, loading: isLoading, error: errorState} = useApi(handleGetProduct);
  
  
  const handleProductLike = useCallback( () => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });
  },[product, handleLike, setProduct])


  
  
  return (
    <>
        <div className="content_cards">
            {isLoading ? <Spinner/> : !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleProductLike}/>}
            
            {!isLoading && errorState && <NotFound title="Ошибка запроса,попробуйте снова."/>}
            </div>
    </>
  );
};
