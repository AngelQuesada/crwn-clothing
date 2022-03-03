import React from "react";

// General
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// Router
import { withRouter } from "react-router-dom";

// Selectors
import { selectCartItems } from "../../redux/cart/cart.selectors";

// Actions
import { toggleCartHidden } from '../../redux/cart/cart.actions'

// Components
import CustomButton from '../custom-button/custom-button';
import CartItem from "../cart-item/cart-item";

// Styles
import './cart-dropdown.scss';

const CartDropdown = ({cartItems, history, dispatch}) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ?
                    cartItems.map(cartItem => 
                        <CartItem key={cartItem.id} item={cartItem} />
                    )
                    :
                    <span className="empty-message">Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={ () => {
                    history.push('/checkout');
                    dispatch(toggleCartHidden());
                }}>
                GO TO CHECKOUT
            </CustomButton>
    </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));