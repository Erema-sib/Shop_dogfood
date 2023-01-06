//Данный код модальных окон рабочий, но не очень правильный (в компоненте Form - много специфичной бизнес-логикиб, захардкоженной), написан для примера.

import { useState } from "react";
import Form from "../Form/form";

export const FormModal = () => {
  const [modalType, setModalType] = useState("login");

  if (modalType === "registration") {
    return (
      <Form
        title="Регистрация"
        input={{ email: "E-mail", password: "Пароль" }}
        button={{ submit: "Зарегистрироваться", redirect: "Войти" }}
        infoText="Бла-бла бла-бла бла-бла, бла-бла бла-бла бла-бла бла-бла, бла-бла"
        formType="registration"
        changeType={setModalType}
        redirect={"login"}
      />
    );
  }

  if (modalType === "login") {
    return (
      <Form
        title="Вход"
        input={{ email: "E-mail", password: "Пароль" }}
        button={{ submit: "Войти", redirect: "Регистрация" }}
        infoText="Бла-трам-пам бла-трам-пам бла-трам-пам"
        formType="login"
        changeType={setModalType}
        redirect={"registration"}
      />
    );
  }

  if (modalType === "reset") {
    return (
      <Form
        title="Восстановление пароля"
        input={{ email: "E-mail" }}
        button={{ submit: "Отправить" }}
        infoText="Трам пам пам 24ч."
        formType="reset"
        infoTextUp="Для получения временного пароля надо ввести номер карты, код CVV и  отправить в сообщении на указанный номер."
        changeType={setModalType}
      />
    );
  }

  return <></>;
};
