/* eslint-disable react/jsx-pascal-case */

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../Form/form";
import FormInput from "../FormInput/form-input";
import Form_Button from "../Form_Button/form-button";
import { EMAIL_REGEXP, PASSWORD_REGEXP, VLDT_CNF } from "../../Utils/regular";


const LoginComp = () => {
    const location = useLocation();
    const firstPath = location.state?.firstPath;
    const {register, handleSubmit, formState: { errors }} = useForm ({mode: "onBlur"})
    const navigate = useNavigate()

    const hanndleOnclickResetBtn = (e) => {
        e.preventDefault();
        navigate("/reset-password", {replace: true, state:{bgLocation: location, firstPath}});
    }

    const hanndleOnclickRegistrBtn = (e) => {
        e.preventDefault();
        navigate("/register", {replace: true, state:{bgLocation: location, firstPath}});
    }

    const HzRegApi = (something) => {
           console.log(something);
    }
   

    const emailRegister = register("email", {
        required: {
            value: true,
            message: VLDT_CNF.requiredMessage
        },
        pattern: {
            value: EMAIL_REGEXP,
            message: VLDT_CNF.emailMessage
        }
    })

    const passwordRegister = register("password", {
        required: {
            value: true,
            message: VLDT_CNF.requiredMessage
        },
        pattern: {
            value: PASSWORD_REGEXP,
            message: VLDT_CNF.passwordMessage
        }
    })
    
    return (
        <Form
            title="Вход" handleFormSubmit={ handleSubmit(HzRegApi) }>
                <FormInput
                    {...emailRegister}
                    id="email"
                    type="text"
                    placeholder="E-mail"
                />
                    {errors?.email 
                    && <p className="errorMessage">
                    {errors?.email?.message}
                    </p>}
                    

                <FormInput
                 {...passwordRegister}
                 id="password"
                 type="password"
                 placeholder="Пароль"
                />
                
                {errors?.password 
                && <p className="errorMessage">
                {errors?.password?.message}
                </p>}
                
               
                <p className="infoText link" onClick={hanndleOnclickResetBtn}>
                   Если забыли пароль, нажмите здесь.
                    </p>
                    <Form_Button type="submit" color="yellow">Войти</Form_Button>
                    <Form_Button color="white" type="button" onClick={hanndleOnclickRegistrBtn}>Регистрация</Form_Button>
                </Form>
    )
}

export default LoginComp;