import './style.css';




function Header({children, user, on_Update_User}) {

  // const handleClickButtonEdit = (e) => {
  //   e.preventDefault();
  //   on_Update_User({name: "Олег", about: "Обучающийся"})
  // }

  return (
  <header className="header">
    <div className="container">
     {/* {user.email && <span>{user.email}</span>}
     {user.name && <span>{user.name}</span>}  */}

     {/* <button className="btn" onClick={handleClickButtonEdit}>Изменить</button> */}
 
      <div className="header_wrapper">
        {children}
      </div>
    </div>
     
  </header>
  )
}

export default Header;
