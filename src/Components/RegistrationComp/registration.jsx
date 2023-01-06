/* eslint-disable react/jsx-pascal-case */
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../Form/form";
import FormInput from "../FormInput/form-input";
import Form_Button from "../Form_Button/form-button";
import {
  EMAIL_REGEXP,
  GROUP_REGEXP,
  PASSWORD_REGEXP,
  VLDT_CNF,
} from "../../Utils/regular";
import { useDispatch } from "react-redux";
import { registUser, userRegistr } from "../../storage/user/userSlice";

const Registration = () => {
  const location = useLocation();
  const firstPath = location.state?.firstPath;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hanndleOnclickLBtn = (e) => {
    e.preventDefault();
    navigate("/login", {
      replace: true,
      state: { bgLocation: location, firstPath },
    });
  };

  const HzRegApi = (data) => {
    console.log(data);
    dispatch(userRegistr(data));
  };

  const emailRegister = register("email", {
    required: {
      value: true,
      message: VLDT_CNF.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VLDT_CNF.emailMessage,
    },
  });

  const passwordRegister = register("password", {
    required: {
      value: true,
      message: VLDT_CNF.requiredMessage,
    },
    pattern: {
      value: PASSWORD_REGEXP,
      message: VLDT_CNF.passwordMessage,
    },
  });

  const groupRegister = register("group", {
    required: {
      value: true,
      message: VLDT_CNF.requiredMessage,
    },
    pattern: {
      value: GROUP_REGEXP,
      message: VLDT_CNF.groupMessage,
    },
  });

  return (
    <Form title="Регистрация" handleFormSubmit={handleSubmit(HzRegApi)}>
      <FormInput
        {...emailRegister}
        id="email"
        type="text"
        placeholder="E-mail"
      />
      {errors?.email && (
        <p className="errorMessage">{errors?.email?.message}</p>
      )}

      <FormInput
        {...passwordRegister}
        id="password"
        type="password"
        placeholder="Пароль"
      />

      {errors?.password && (
        <p className="errorMessage">{errors?.password?.message}</p>
      )}

      <FormInput
        {...groupRegister}
        id="group"
        type="text"
        placeholder="id группы - group-7"
      />

      {errors?.group && (
        <p className="errorMessage">{errors?.group?.message}</p>
      )}

      <p className="infoText">
        Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
        конфиденциальности и соглашаетесь на информационную рассылку.
      </p>
      <Form_Button type="submit" color="yellow">
        Зарегистрироваться
      </Form_Button>
      <Form_Button color="white" type="button" onClick={hanndleOnclickLBtn}>
        Войти
      </Form_Button>
    </Form>
  );
};

export default Registration;
