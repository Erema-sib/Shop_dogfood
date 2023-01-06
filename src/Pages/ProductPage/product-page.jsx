import Spinner from "../../Components/Spinner/index";
import {  useEffect } from "react";
import Product from "../../Components/Product/product";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../../Components/NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, setProductState } from "../../storage/singleProduct/singleProductSlice";
import { fetchChangeLikeProduct } from "../../storage/products/productsSlice";


export const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  
  const {data: product, loading: isLoading, error: errorState} = useSelector(state => state.singleProduct);
  
  
  useEffect(()=>{
    dispatch(fetchSingleProduct(productId))
  }, [dispatch, productId]);

  const handleProductLike = useCallback(() => {  
    dispatch(fetchChangeLikeProduct(product))
       .then(updateProduct => {
          dispatch(setProductState(updateProduct.payload.product))
    })
  },[product, dispatch]) 

  

  
  
  return (
    <div className="container container_inner">
        <div className="content_cards">
            {isLoading ? <Spinner/> : !errorState && <Product {...product}
            allData={product} onProductLike={handleProductLike}/>}
            
            {!isLoading && errorState && <NotFound title="Ошибка запроса,попробуйте снова."/>}
            </div>
    </div>
  );
};
