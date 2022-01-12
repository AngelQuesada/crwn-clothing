import React from "react";

// General
import { Link } from 'react-router-dom';
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";

// Components
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

// Statics
import { ReactComponent as Logo } from '../../assets/crown.svg';

// Styles
import './header.scss';

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link to="/">
            <Logo className='logo'></Logo>
        </Link>
        <div className="options">
            <Link to='/shop' className='option'>
                SHOP
            </Link>
            <Link to='/shop' className='option'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>

            }
            <CartIcon></CartIcon>
        </div>
        {
            hidden ? null:<CartDropdown/>
        }
    </div>
)

const mapStateToProps = ({user:{currentUser}, cart: {hidden}}) => ({
    currentUser: currentUser,
    hidden: hidden
}) 

export default connect(mapStateToProps)(Header);