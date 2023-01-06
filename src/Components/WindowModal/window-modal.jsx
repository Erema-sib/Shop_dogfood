import "./index.scss";
import cn from "classnames";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WindowModal({ children }) {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setActive(true);
  }, []);

  function onClose() {
    setActive(false);
    navigate(-1);
  }

  return (
    <div className={cn("modalwin", { ["active"]: active })} onClick={onClose}>
      <div
        
        className={cn("modalwin_content", { ["active"]: active })}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default WindowModal;
