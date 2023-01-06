import cn from "classnames";
import s from "./index.module.css";

const Form_Button = ({ children, color, ...props }) => {
  return (
    <button {...props} className={cn(s.btn, s[color])}>
      {children}
    </button>
  );
};

export default Form_Button;
