import React from "react";

// General
import { Link } from 'react-router-dom';
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// Selectors
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

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

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
}) 

export default connect(mapStateToProps)(Header);