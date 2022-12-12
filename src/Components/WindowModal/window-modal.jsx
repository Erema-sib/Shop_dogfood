import  "./style.css";
import cn from "classnames";

function WindowModal ({active, setActive, children}) {
    return (
        <div className={cn("modalwin", {["active"]: active})} onClick={() => {setActive(false)}}>
            <div className={cn("modalwin_content", {["active"]: active})} onClick={e => e.stopPropagation()}>
               {children}
            </div>
        </div>
    );
 };



 export default WindowModal;