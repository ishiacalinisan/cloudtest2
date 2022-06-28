import PropTypes from "prop-types";
import React, { Component, Fragment, useEffect, useState } from "react";
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

//from tutorial
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';
import moment, { calendarFormat } from 'moment';
import Calendar from 'react-calendar-pane';


// Firestore
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import db from '../../components/FirestoreConfig/FirestoreConfig';


class Calendarview extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate:moment(),
      bookings:[],

    }
    this.fetchBookings(moment());
  }
  onSelect=(e)=>{

    this.setState({selectedDate:e});
    this.fetchBookings(e);

  }
  async fetchBookings(date) {

      const response=db.collection('booking-calendar');
      const data= await response.where("date", "==", date.format('DD-MM-YYYY').toString()).get();
      if (data.empty===false) {
        data.docs.forEach(item=>{
        this.setState({
          bookings : item.data()
        })
      })} else {
      this.setState({
        bookings : []
          }
        )
      }



  }
  render() {
    return (
      <div className="body-wrapper space-pt--70 space-pb--120">
        <Breadcrumb pageTitle="Calendar" prevUrl="/home" />
          <Fragment>
            <center>
              <Calendar date={moment()} onSelect={this.onSelect} />
              <br></br>
              <div>
                <h7> Bookings for: <b>{this.state.selectedDate.format('DD-MM-YYYY').toString()}</b> </h7>
              </div>
              <br></br>
              <div>

              <div key={this.state.bookings.date}>
                <p key={this.state.bookings.id}><b>Provider</b>: {this.state.bookings.provider}</p>
                <p key={this.state.bookings.id}><b>Service</b>: {this.state.bookings.service}</p>
                <p key={this.state.bookings.id}><b>Time</b>: {this.state.bookings.time}</p>

              </div>


           {/* <FirestoreData input={this.state.selectedDate.format('DD-MM-YYYY').toString()} /> */}
              </div>
            </center>
          </Fragment>

      </div>
    );
  }
}

Calendarview.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendarview);
