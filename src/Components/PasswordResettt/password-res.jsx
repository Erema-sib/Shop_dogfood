/* eslint-disable react/jsx-pascal-case */

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../Form/form";
import FormInput from "../FormInput/form-input";
import Form_Button from "../Form_Button/form-button";
import { EMAIL_REGEXP, PASSWORD_REGEXP, VLDT_CNF } from "../../Utils/regular";

const PasswodrdRes = () => {
    const {register, handleSubmit, formState: { errors }} = useForm ({mode: "onBlur"})
   
    const HzRegApi = (data) => {
           console.log(data);
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

    
    return (
        <Form
            title="Восстановление пароля" handleFormSubmit={ handleSubmit(HzRegApi) }>
                <p className="infoText">
                   Для получение временного пароля необходимо ввести e-mail, указанный при регистрации.
                    </p>
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
               
                <p className="infoText">
                   Срок дейсвия временного пароля 24ч.
                    </p>
                    <Form_Button type="submit" color="yellow">Отправить</Form_Button>
                </Form>
    )
}


export default PasswodrdRes;