// Код рабочий , но не поддерживаемый, для примера.
/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import { useForm } from "react-hook-form";
import  FormInput from  "../FormInput/form-input";
import Form_Button from "../Form_Button/form-button";
import "./style.css";




function Form({title, input, button, formType, infoText, changeType, infoTextUp, redirect}) {
    const {register, handleSubmit, formState: { errors }} = useForm ({mode: "onBlur"})
    
    const callbackSubmit = (something) =>{
        console.log(something);
    }

    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const emailRegister = register("email", {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: emailRegexp,
            message: "E-mail не существует"
        }
    })

    const passwordRegister = register("password", {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: passwordRegexp,
            message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"
        }
    })
    
    
    return (
        <form onSubmit={handleSubmit(callbackSubmit)}>
            <h1 className="title">{title}</h1>
            <FormInput
                    {...emailRegister}
                    id="email"
                    type="text"
                    placeholder={input.email}
            />
                       <div>
                        {errors?.email 
                        && <p className="errorMessage">
                           {errors?.email?.message}
                           </p>}
                        </div>

            {["login", "registration"].includes(formType) &&
            <>
                 <FormInput
                 {...passwordRegister}
                 id="password"
                 type="password"
                 placeholder={input.password}
                 />
                <div>
                {errors?.password 
                && <p className="errorMessage">
                    {errors?.password?.message}
                    </p>}
                </div>
            </>
            }


            { formType === "login" &&
              <p className="infoText link" onClick={() => changeType("reset")}>{infoText}</p>
                
            }

                 {["reset", "registration"].includes(formType) &&
                 <p className="infoText">{infoText}</p>
                 }

            <Form_Button type="submit" color="yellow">{button.submit}</Form_Button>

                {["login", "registration"].includes(formType) &&
                 <Form_Button color="white" type="button" onClick={() => changeType(redirect)}>{button.redirect}</Form_Button>
                 }
            
        </form>
    );
};



export default Form;