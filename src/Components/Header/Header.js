import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Header.css'
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { getAuth, signOut } from "firebase/auth";
import olxLogo from "../olx-logo.png"



function Header() {

    const { user } = useContext(AuthContext);
    const [account, setAccount] = useState(false)

    const navigate = useNavigate();

    const signout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/login')
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    const handelAccount = () => {
        setAccount(!account);
    }

    const createPost = () =>{
        navigate('/create');
    }


    const loginPage = () => {
        navigate('/login')
    }

    return (
        <div>
            <div className='header'>
                <img onClick={()=>{
                    navigate('/')
                }} className='logo' src={olxLogo} alt="Olx Logo" />
                <div className='location'>
                    <Search />
                    <input type="text" />
                    <Arrow />

                </div>
                <div className='productSearch'>
                    <input type="text" placeholder='Find car,mobile phone and more...' />
                    <div className='productSearchIcon'>
                        <Search />
                    </div>
                </div>
                <div className='language'>
                    <span> ENGLISH</span>
                    <Arrow />
                </div>
                <div className='loginPage'>
                    {
                        user ?
                            <div className="dropdown">
                                <span className="dropdown-toggle" onClick={handelAccount}>Account</span>
                                <Arrow className="dropdown-toggleArrow" onClick={handelAccount} />
                                {account &&
                                    <div className="dropdown-menu">
                                        <span>{user.email}</span>
                                        <br />
                                        <span onClick={signout} style={{ color: 'black' }}>Logout</span>
                                    </div>
                                }
                            </div>
                            :
                            <span onClick={loginPage}  >Login</span>
                    }
                    <hr />
                </div>


                <div className="sellMenu">
                    <SellButton></SellButton>
                    <div className="sellMenuContent">
                        <SellButtonPlus onClick={createPost}></SellButtonPlus>
                        <span onClick={createPost}>SELL</span>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Header

