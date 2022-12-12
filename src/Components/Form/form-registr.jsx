import "./style.css";
import { useForm } from "react-hook-form";




function RegistrForm() {
  
    const {register, handleSubmit, formState} = useForm({mode: "onBlur"});

    const callbackSubmit = (something) =>{
        console.log(something);
    }

    console.log(formState);
        
            return (
            <form onSubmit={handleSubmit(callbackSubmit)}>
                <h3>Регистрация</h3>
                <input
                        {...register("name", {
                            minLength: {
                                value: 3,
                                message: "Ошибка,нет такого имени"
                            },
                        })}
                        type="text"
                        placeholder="Имя"
                        />
                        <div>
                        {formState.errors?.name 
                        && <p className="errorMessage">
                           {formState.errors?.name?.message}
                           </p>}
                        </div>


                <input
                        {...register("e-mail")}
                        type="text"
                        placeholder="E-mail"
                        />

                <input
                        {...register("password", {
                            required: {
                             value: true,
                             message: "Пароль обязателен!"
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "Пароль должен содержать не менее восьми символов - букв и цифр"
                            }
                        })}
                        type="password"
                        placeholder="Password"
                        />
                        <div>
                        {formState.errors?.password
                          && <p className="errorMessage">
                             {formState.errors?.password?.message}
                             </p>}
                        </div>

                <button>Зарегистрироваться</button>
            </form>
        );
        };



export default RegistrForm;