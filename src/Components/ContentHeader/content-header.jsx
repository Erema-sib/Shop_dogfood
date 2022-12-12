/* eslint-disable jsx-a11y/anchor-is-valid */

import { useNavigate } from "react-router-dom"


export const ContentHeader = ({title, children}) => {
    const navigate = useNavigate();
    return (
        <div>
            <a href="#" className="buttonBack" onClick={() => navigate(-1)}>
            Назад
            </a>
            <h1 className="title">{title}</h1>
            {children}
        </div>
      )

}