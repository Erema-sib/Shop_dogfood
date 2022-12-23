// Код рабочий , но не поддерживаемый, для примера.
/* eslint-disable react/jsx-pascal-case */
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import  FormInput from  "../FormInput/form-input";
// import Form_Button from "../Form_Button/form-button";
import "./style.css";




function Form({ title, handleFormSubmit, children }) {
    
    return (
        <form className="form" onSubmit={handleFormSubmit}>
            <h1 className="title">{title}</h1>

             {children}

            {/* <FormInput
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
                 } */}
            
        </form>
    );
};



export default Form;