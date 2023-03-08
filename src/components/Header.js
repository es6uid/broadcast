const Header = (props) => {
    const logout = async() => {
        props.setLoggedUser('')
        props.setLoginSignupModalVisibility('d-block')
        await fetch(`${props.api}/user/?email=${props.loggedInUser.email}&isLoggedIn=false`)
    }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div className="container-fluid">
                {/* <a className="navbar-brand" href="#">Navbar w/ text</a> */}
                <button class="btn btn-outline-success me-2" onClick={() => props.setClassModalVisibility('d-block')}>Create session</button>
                <button class="btn btn-outline-success" onClick={() => props.setPoolModalVisibility('d-block')}>Manage Pool</button>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item"> */}
                    {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                    {/* Home */}
                    {/* </li> */}
                    {/* <li className="nav-item">
                    <a className="nav-link" href="#">Features</a>
                    </li> */}
                    {/* <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                    </li> */}
                </ul>
                <span className="navbar-text me-2">
                   {props?.loggedInUser?.email && `Welcome, ${props.loggedInUser.email}`}
                </span>
                <form class="d-flex" role="search">
                    <button onClick={logout} class="btn btn-outline-danger" type="button">Logout</button>
                </form>
                
                </div>
            </div>
        </nav>
    )
}
export default Header;