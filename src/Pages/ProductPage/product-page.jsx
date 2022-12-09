import Header from "../../Components/Header/header";
import Logo from "../../Components/Logotype/Logo";
import Search from "../../Components/Search/Search";
import Sort from "../../Components/Sort/Sort";
import Spinner from "../../Components/Spinner/index";
import Footer from "../../Components/Footer/footer";
import { useContext, useEffect, useState } from "react";
import api from "../../Components/Utils/Api"
import { isLiked } from "../../Components/Utils/product_card"
import Product from "../../Components/Product/product";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../../Components/NotFound/NotFound";
import { ContextUser } from "../../Context/ContextUser";
import { CardContext } from "../../Context/cardContext";


// const ID_PRODUCT = "622c77e877d63f6e70967d22";

export const ProductPage = ({ isLoading }) => {
  const { productId } = useParams();
  const [product, SetProduct ] = useState(null);
  const [errorState, setErrorState] = useState(null);
  
  const {handleLike} = useContext(CardContext);


  const handleProductLike = useCallback( () => {
    handleLike(product).then((updateProduct) => {
      SetProduct(updateProduct);
    });
  },[product, handleLike])

  useEffect(() => {
    // setIsLoading(true);
 api.getProductById(productId)
      .then((productData) => {
        // setCurrentUser(userData);
        SetProduct(productData);
      })
      .catch((error) => setErrorState(error))
      // .finally(() => {
      //   setIsLoading(false);
      // });
  }, []);
  
  return (
    <>
        <div className="content_cards">
            {isLoading ? <Spinner/> : !errorState && <Product {...product} SetProduct={SetProduct} onProductLike={handleProductLike}/>}
            
            {!isLoading && errorState && <NotFound title="Ошибка запроса,попробуйте снова."/>}
            </div>
    </>
  );
};
