import './style.css';




function Header({children}) {
  return (
  <header className="header">
    <div className="container">
      <div className="header_wrapper">
        {children}
      </div>
    </div>
     
  </header>
  )
}

export default Header;
