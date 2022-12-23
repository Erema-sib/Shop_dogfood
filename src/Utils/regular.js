export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const VLDT_CNF = {
    requiredMessage: "Обязательное поле",
    emailMessage: "E-mail не существует",
    passwordMessage:"Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"
}

export const INITIAL_Value_RAT = 0;

export const SORTED = {
    LOW: "low",
    CHEAP: "cheap",
    SALE: "sale"
}