import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactSVG } from "react-svg";
import {
  addToCartDispatch,
  decreaseQuantityDispatch,
  cartItemStock
} from "../../redux/actions/cartActions";
import { getDiscountPrice } from "../../helpers/product";
import { Breadcrumb } from "../../components";


class Confirmed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  } 
  render() {
    const { addToCart, decreaseQuantity, cartItems } = this.props;
    const { quantity } = this.state;
    let cartTotalPrice = 0;
    return (
      <div className="body-wrapper space-pt--70 space-pb--120">
        <Breadcrumb pageTitle="Confirmed Order" prevUrl="/checkout" />
          <Fragment>
            <div className="your-order-area space-pt--70 space-pb--120">
              <center>
                <h1>Thanks for your booking!</h1>
                <br></br>
                <br></br>
                <p>
                  Your appointment has been added to your <Link to={process.env.PUBLIC_URL + "/calendarview"} style={{color: '#0000ff'}}>calendar</Link>.
                </p>
              </center>
            </div>
          </Fragment>
      </div>
    );
  }
}

Confirmed.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  decreaseQuantity: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, quantityCount) => {
      dispatch(addToCartDispatch(item, quantityCount));
    },
    decreaseQuantity: item => {
      dispatch(decreaseQuantityDispatch(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmed);
