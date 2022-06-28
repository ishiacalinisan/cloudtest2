import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Swiper from "react-id-swiper";
import { ReactSVG } from "react-svg";
import { Rating } from "../../components";


import {
  getDiscountPrice,
  getProductCartQuantity
} from "../../helpers/product";
import { addToCartDispatch } from "../../redux/actions/cartActions";
import { addToWishlistDispatch } from "../../redux/actions/wishlistActions";
import * as ppspInfo from "../../data/services.json"


// Firestore
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import db from '../../components/FirestoreConfig/FirestoreConfig.js';

import moment, { calendarFormat } from 'moment';




class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate:[],
      selectedTime:[],
      selectedService:props.product.name,
      selectedProvider:props.product.provider,
      selectedProductColor: props.product.variation
        ? props.product.variation[0].color
        : "",
      productStock: props.product.variation
        ? props.product.variation[0].stock
        : props.product.stock,
      quantityCount: 1
    };
  }
  onSelectDate=()=>{
    var date = document.getElementById('date').value;
    var changed_date = this.changedateformat(date)
    this.setState({selectedDate:changed_date});
  }
  onSelectTime=(e)=>{
    this.setState({selectedTime:e.target.value});
    
  }
  async setBookings(date, time, service, provider) {
    const payload = {
      date,
      time,
      service,
      provider
    }
    const response= await db.collection('booking-calendar').add(payload);
    }
  changedateformat=(val)=> {
      const myArray = val.split("-");

      let year = myArray[0];
      let month = myArray[1];
      let day = myArray[2];

      let formatteddate = day + "-" + month + "-" + year; 
      return formatteddate;
  }


  render() {
    const {
      product,
      cartItems,
      wishlistItems,
      addToCart,
      addToWishlist
    } = this.props;
    const { selectedProductColor, productStock, quantityCount } = this.state;
    const params = {
      loop: true,
      speed: 1000,
      watchSlidesVisibility: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    };
    const wishlistItem = wishlistItems.filter(
      wishlistItem => wishlistItem.id === product.id
    )[0];

    const productCartQty = getProductCartQuantity(
      cartItems,
      product,
      selectedProductColor
    )

    console.log(this.state.selectedDate)
    console.log(this.state.selectedTime)
    console.log(this.state.selectedService)
    console.log(this.state.selectedProvider)
    
    ;
    return (
      <div className="body-wrapper space-pt--70 space-pb--120">
        {/*====================  product image slider ====================*/}
        <div className="product-image-slider-wrapper space-pb--30 space-mb--30">
          <Swiper {...params}>
            {ppspInfo.pet_services[product.id[0]-1].image &&
              ppspInfo.pet_services[product.id[0]-1].image.map((single, key) => {
                return (
                  <div key={key}>
                    <div className="product-image-single swiper-slide">
                      <img
                        src={ppspInfo.pet_services[product.id[0]-1].image}
                        className="img-fluid"
                        alt=""
                        height="350"
                        width="300"
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </div>
        {/*====================  End of product image slider  ====================*/}

        {/*====================  product content ====================*/}
        {/* product content header */}
        <div className="product-content-header-area border-bottom--thick space-pb--30">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="product-content-header">
                  <div className="product-content-header__main-info">
                    <h3 className="title">{product.name}</h3>
                    <div className="price">
                      <Fragment>
                        <span className="discounted-price">{`€${product.price}`}</span>
                      </Fragment>
                    </div>
                    <div className="rating">
                      {product.rating > 1 ? (
                        <Fragment>
                          <ul className="rating__stars">
                            <Rating ratingValue={product.rating} />
                          </ul>
                          <span className="rating__text">
                            {product.ratingCount}
                          </span>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="product-content-header__wishlist-info text-center">
                    <ReactSVG
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/icons/heart-dark.svg"
                      }
                    />
                    <span className="count">{product.wishlistCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* product content description */}
        <div className="product-content-description border-bottom--thick space-pt--25 space-pb--25">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p className="space-mb--25">{product.shortDescription}</p>
                <h4 className="space-mb--5">Address</h4>
                <p>
                  {ppspInfo.pet_services[product.id[0]-1].address}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* product content safety */}
        <div className="product-content-safety border-bottom--thick space-pt--15 space-pb--15">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4>
                  <ReactSVG
                      src={
                        process.env.PUBLIC_URL + "/assets/img/icons/security.svg"
                      }
                  />
                  {" "}
                  Secure Payment Method.
                </h4>
              </div>
            </div>
          </div>
        </div>

        
        {/* Date Selector */}
        <div className="product-content-description border-bottom--thick space-pt--25 space-pb--25">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div>
                  <form action="/date" onSelect={this.onSelectDate}>
                    <label>
                      <h4 className="space-mb--5">Select your preferred date</h4>
                      <input type="date" name="bday" id="date" >
                      </input>
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>





          

        {/* Time Slot Buttons */}
        <div className="product-content-description space-pt--25 space-pb--25">
        <div className="container">
            <div className="row">
              <div className="col-12">
                <h4 className="space-mb--5">Select your preferred slot</h4>
                  <div className="days">
                    <div className="day">
                      <button className="timeslot" onClick={this.onSelectTime} value={"09:00"}>09:00am</button>
                      <button className="timeslot" onClick={this.onSelectTime} value={"09:30"}>09:30am</button>
                      <button className="timeslot" onClick={this.onSelectTime} value={"10:00"}>10:00am</button>
                    </div>
                    <div className="day">
                      <button className="timeslot" onClick={this.onSelectTime} value={"10:30"}>10:30am</button>
                      <button className="timeslot" onClick={this.onSelectTime} value={"11:00"}>11:00am</button>
                      <button className="timeslot" onClick={this.onSelectTime} value={"11:30"}>11:30am</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        {/* shop product button */}
        <div className="shop-product-button">
          <button
            className="wishlist"
            disabled={wishlistItem !== undefined}
            onClick={() => addToWishlist(product)}
          >
            {" "}
            {wishlistItem !== undefined
              ? "ADDED TO FAVOURITES"
              : "ADD TO FAVOURITES"}
          </button>
          {productStock && productStock > 0 ? (
            <button
              className="cart"
              onClick={() =>{
                addToCart(product, quantityCount, selectedProductColor);
                this.setBookings(
                  this.state.selectedDate, 
                  this.state.selectedTime, 
                  this.state.selectedService,
                  this.state.selectedProvider
                  );
                }
              }
            
            >
              ADD APPOINTMENT TO CART
            </button>
          ) : (
            <button className="cart" disabled>
              OUT OF STOCK
            </button>
          )}
        </div>
        {/*====================  End of product content  ====================*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product:
      state.productData.products &&
      state.productData.products.filter(single => single.id === itemId)[0],
    wishlistItems: state.wishlistData,
    cartItems: state.cartData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, quantityCount, selectedProductColor) => {
      dispatch(addToCartDispatch(item, quantityCount, selectedProductColor));
    },
    addToWishlist: item => {
      dispatch(addToWishlistDispatch(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
