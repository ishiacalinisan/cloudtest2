import React, { Component, Fragment } from "react";
import axios from "axios";
import { Preloader, ErrorMessage, Breadcrumb } from "../../components";
import { FaRegCheckCircle, FaRegTimesCircle, FaRedo } from "react-icons/fa";
import { getDiscountPrice } from "../../helpers/product";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: true,
      errorMessage: null
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders() {
    axios
      .get(process.env.PUBLIC_URL + "/data/order.json")
      .then(response =>
        this.setState({
          orders: response.data,
          isLoading: false
        })
      )
      .catch(error =>
        this.setState({ errorMessage: error.message, isLoading: false })
      );
  }

  render() {
    const { orders, isLoading, errorMessage } = this.state;
    let content;
    if (isLoading) {
      content = <Preloader />;
    } else {
      if (errorMessage) {
        content = <ErrorMessage errorMessage={errorMessage} />;
      } else {
        content = (
          <div className="body-wrapper space-pt--70 space-pb--120">
            <Breadcrumb pageTitle="Orders" prevUrl="/home" />
            <div className="no-items-found">
              <div className="no-items-found__image">
                <ReactSVG
                  src={process.env.PUBLIC_URL + "/assets/img/icons/cart-two.svg"}
                />
              </div>
              <div className="no-items-found__content">
                <p>
                  No history yet.{" "}
                  <Link to={process.env.PUBLIC_URL + "/shop"}>Book Some</Link>
                </p>
              </div>
            </div>
          </div>
        );
      }
    }
    return <Fragment>{content}</Fragment>;
  }
}

export default Order;
