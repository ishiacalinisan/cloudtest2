import PropTypes from "prop-types";
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { getDiscountPrice } from "../../helpers/product";
import { addToWishlistDispatch } from "../../redux/actions/wishlistActions";

class ShopServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridActivate: true,
      listActivate: false
    };

    this.setGridActive = this.setGridActive.bind(this);
    this.setListActive = this.setListActive.bind(this);
  }

  setGridActive() {
    this.setState({
      gridActivate: true,
      listActivate: false
    });
  }

  setListActive() {
    this.setState({
      gridActivate: false,
      listActivate: true
    });
  }

  render() { 
    const { products, wishlistItems, addToWishlist } = this.props;
    const { gridActivate, listActivate } = this.state;
    const { setGridActive, setListActive } = this;
    return (
      <div className="shop-products-area">
        {/* shop list products */}
        <div
          className={`shop-list-products-wrapper`}
        >
          {products &&
            products.map(single => {
              const wishlistItem = wishlistItems.filter(
                wishlistItem => wishlistItem.id === single.id
              )[0];
              return (
                <div
                  className="list-product border-bottom--medium"
                  key={single.id}
                >
                  <button
                    className={`icon ${
                      wishlistItem !== undefined ? "active" : ""
                    }`}
                    disabled={wishlistItem !== undefined}
                    onClick={() => addToWishlist(single)}
                  >
                    <ReactSVG src="assets/img/icons/heart-dark.svg" />
                  </button>
                  <div className="list-product__content">
                    <h3 className="title">
                      <Link
                        to={process.env.PUBLIC_URL + `/product/${single.id}`}
                      >
                        {single.name}
                      </Link>
                    </h3>
                    <div className="price">
                      <Fragment>
                        <span className="discounted-price">{`€${single.price}`}</span>
                      </Fragment>
                    </div>
                    <p>{single.shortDescription}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

ShopServices.propTypes = {
  addToWishlist: PropTypes.func,
  products: PropTypes.array,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    wishlistItems: state.wishlistData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToWishlist: item => {
      dispatch(addToWishlistDispatch(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopServices);
