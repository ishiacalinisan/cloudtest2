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

//From tutorial
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCdiyFwn90uHcb3owsMbVFikWXU6hQrrGI",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  return (
    <GoogleMap 
      zoom={10} 
      center={{lat: 40.438699439743694, lng: -3.6874235000000004}}
      mapContainerClassName="map-container"
    >
      <Marker position={{lat: 40.43635573038929, lng: -3.6829797079659983}} /> 
    </GoogleMap>
  );
}

