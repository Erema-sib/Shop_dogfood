import { getLocalData } from "./localStorage";

const on_Responce = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}


class Api {
    constructor({baseUrl, headers}) {
        this.headers = headers;
        this.baseUrl = baseUrl;
    }

    getProductList() {
        return fetch(`${this.baseUrl}/products`, {
            headers: {...this.headers, Authorization: getLocalData("token")}
        }).then(on_Responce)
    }

    getProductById(idProduct) {
        return fetch(`${this.baseUrl}/products/${idProduct}`, {
            headers: {...this.headers, Authorization: getLocalData("token")}
        }).then(on_Responce)
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/v2/group-7/users/me`, {
            headers: {...this.headers, Authorization: getLocalData("token")}
        }).then(on_Responce)
    }

    setUserInfo(dataUser) {
        return fetch(`${this.baseUrl}/v2/group-7/users/me`, {
            method: "PATCH",
            headers: {...this.headers, Authorization: getLocalData("token")},
            body: JSON.stringify(dataUser)
        }).then(on_Responce)
    }

    //Запрос для  создания отзыва
    createReviewProduct(productId, reviewData) {
        return fetch(`${this.baseUrl}/products/review/${productId}`, {
            method: "POST",
            headers: {...this.headers, Authorization: getLocalData("token")},
            body: JSON.stringify(reviewData)
        }).then(on_Responce)
    }

    search(searchProducts) {
        return fetch(`${this.baseUrl}/products/search?query=${searchProducts}`, {
            headers: {...this.headers, Authorization: getLocalData("token")}
        }).then(on_Responce)
    }

    changeLikeProduct(productId, isLike) {
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {...this.headers, Authorization: getLocalData("token")}
        })
        .then(on_Responce)
    }


// Три метода - авторизация,регистрация, проверка токена
    register(bodyData) {
        return fetch(`${this.baseUrl}/signup`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(bodyData)
        }).then(on_Responce)
    }

    authorize(bodyData) {
        return fetch(`${this.baseUrl}/signin`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(bodyData)
        }).then(on_Responce)
    }

    checkToken(token) {
        return fetch(`${this.baseUrl}/v2/group-7/users/me`, {
            headers: {...this.headers, Authorization: `Bearer ${token}`},
        }).then(on_Responce)
    }
}

const config ={
    baseUrl: `https://api.react-learning.ru`,
    headers: {
        "content-type": "application/json",
        // Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzljZjkiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDYsImV4cCI6MTY5OTQ0Nzk0Nn0.ZmPeqcgqVhjb7XkTd6HQcz2yI7qRhjd6VEIEax9EcZw`
    }
}


const api = new Api(config);



export default api;
