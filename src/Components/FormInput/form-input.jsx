import { forwardRef } from "react";
import s from "./index.module.css";
import cn from "classnames"

const FormInput = forwardRef((props, ref) => {
    
    return (
            props.typeinp === "textarea" 
            ? <textarea ref={ref} className={cn(s.textarea, s.input)} {...props}/>
            : <input ref={ref} className={s.input} {...props}/>
    )
})



export default FormInput;