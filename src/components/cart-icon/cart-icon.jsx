import React from "react";

// General
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

// Selectors
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

// Assets
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

// Styles
import './cart-icon.scss';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)