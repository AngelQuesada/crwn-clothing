import React from "react";

// General
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// Components
import CheckoutItem from "../../components/checkout-item/checkout-item";

// Selectors
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'

// Styles
import './checkout.scss';

const CheckoutPage = ({cartItems, total}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )
        }

        <div className="total">
            <span>TOTAL: ${total}</span>
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);