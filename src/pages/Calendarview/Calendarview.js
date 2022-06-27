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
import db from '../../components/fig/FirestoreConfig.js';

function FirestoreData(props) {
  const [bookings,setBookings]=useState([])
  const fetchBookings=async()=>{
    const response=db.collection('booking-calendar');
    const data=await response.where("date", "==", props.input).get();
    data.docs.forEach(item=>{
      setBookings([...bookings,item.data()])
    })
  }
  useEffect(() => {
    fetchBookings();
  }, [])
  return (
    <div className="FirestoreData">
      <p> hello </p>
      {
        bookings && bookings.map(booking=>{
          return(
            <div className="booking-container" key={booking.id}>
              <p key={booking.id}>{booking.date}</p>
              <p key={booking.id}>{booking.service}</p>
            </div>
          )
        })
      }
    </div>
  );
}



class Calendarview extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate:moment()
    }
  }
  onSelect=(e)=>{
    this.setState({selectedDate:e})
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
                <p> The date you've selected is: {this.state.selectedDate.format('DD-MM-YYYY')} </p>
              </div>
              <div>
                <FirestoreData input={this.state.selectedDate.format('DD-MM-YYYY')} />
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
