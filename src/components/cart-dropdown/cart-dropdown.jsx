import React from "react";

// General
import CustomButton from '../custom-button/custom-button';

// Styles
import './cart-dropdown.scss';

const CartDropdown = () => (
    <div className="cart-dropdown">
        <div className="cart-item"></div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

export default CartDropdown;