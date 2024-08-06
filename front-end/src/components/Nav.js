import React, { } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const navigate = useNavigate();

    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>

<img className='logo' src="https://yt3.ggpht.com/ytc/AKedOLR09bCpy_XTq2scU91URc0pWG0EqS_Yc_Zg-r9pBQ=s900-c-k-c0x00ffffff-no-rj" alt="" />

            {
                auth ? <ul className='nav-ul'>

                    <li><Link to="/" className='pi'>Products</Link></li>
                    <li><Link to="/add" className='pi'>Add Product</Link></li>
                    
                     <li><Link to="/update" className='pi'>Update Product</Link></li> 

                    <li><Link to="/profile" className='pi'>Profile</Link></li>
                    <li><Link  onClick={logout} to="/logout" className='pi'>Logout 
                    -({JSON.parse(auth).name})</Link></li>
                </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li><Link className='pi' to="/signup"> Signup</Link></li>
                        <li><Link className='pi' to="/login">Login</Link></li>
                    </ul>
            }


        </div>
    )
}
export default Nav;