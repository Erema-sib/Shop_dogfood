export const  isLiked = (likes, userId ) => likes.some( id => id === userId);

export const calcDiscountPrice = (price, discount) => {
   return Math.round(price - (price * discount)/100);
}

export const createMarkup = (textToHtml) => {
   return {
      __html: textToHtml
   }
}

export const checkProductCart = (cartProducts, _id) => {
   const productCart = cartProducts.find(
      (i) => i._id ===_id
   )
   if (productCart?.quantity) {
      return {quantity: productCart.quantity, exist: true}
   }
   return {quantity:0, exist: false};
}