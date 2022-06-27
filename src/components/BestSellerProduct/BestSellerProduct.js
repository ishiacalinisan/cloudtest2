import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { getProducts, getDiscountPrice } from "../../helpers/product";
import { addToWishlistDispatch } from "../../redux/actions/wishlistActions";

const BestSellerProduct = ({ products, wishlistItems, addToWishlist }) => {
  return (
    <div className="featured-product-area space-mb--25">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* section title */}
            <h2 className="section-title space-mb--20">
              Most Pawpular Providers{" "}
              <Link to={process.env.PUBLIC_URL + "/shop"}>
                VIEW ALL{" "}
                <span>
                  <ReactSVG
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/img/icons/arrow-right.svg"
                    }
                  />
                </span>
              </Link>
            </h2>
            {/* featured products */}
            <div className="featured-product-wrapper space-mb-m--15">
              <div className="row row-5">
                {products[0].slice(1, 3) &&
                  products[0].slice(1, 3).map((single) => {
                    const wishlistItem = wishlistItems.filter(
                      (wishlistItem) => wishlistItem.id === single.id
                    )[0];
                    return (
                      <div className="col-6" key={single.id}>
                        <div className="featured-product space-mb--15">
                          <div className="featured-product__image">
                            <Link
                              to={
                                process.env.PUBLIC_URL + `/services/${single.id}`
                              }
                            >
                              <img
                                src={process.env.PUBLIC_URL + single.image[0]}
                                className="img-fluid"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="grid-product__content">
                            <h3 className="title">
                              <Link
                                to={process.env.PUBLIC_URL + `/services/${single.id}`}
                              >
                                {single.name}
                              </Link>
                            </h3>
                            <div className="rating">
                              <img
                                  src={process.env.PUBLIC_URL + single.rating_stars}
                                  className="img-fluid"
                                  alt=""
                              />
                            </div>
                            <span className="category">
                              {single.category.map((item, index, arr) => {
                                return (
                                  item + (index !== arr.length - 1 ? ", " : "")
                                );
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BestSellerProduct.propTypes = {
  addToWishlist: PropTypes.func,
  products: PropTypes.array,
  wishlistItems: PropTypes.array
};
const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(
      state.productData.products,
      ownProps.limit,
      ownProps.type
    ),
    wishlistItems: state.wishlistData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item) => {
      dispatch(addToWishlistDispatch(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestSellerProduct);
