import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { connect } from "react-redux";
import { ShopServices } from "../../components";
import {
  toggleShopTopFilter,
  getIndividualCategories,
  getIndividualColors,
  setActiveSort,
  getSortedProducts
} from "../../helpers/product";

//From tutorial
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import * as ppspInfo from "../../data/services.json";

const mapStyles = {
  width: '60%',
  height: '40vh',
  left: '20%',
  right: '50%',
  top: '50%',
  display: 'flex'
};

function ShowMap() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <GoogleMap 
      zoom={13} 
      center={{lat: 40.438699439743694, lng: -3.6874235000000004}}
      mapContainerClassName="map-container"
      mapContainerStyle={mapStyles}
    >
          <Marker 
            key={ppspInfo.pet_services[window.location.href.slice(-1) - 1].id} 
            position={{
              lat: ppspInfo.pet_services[window.location.href.slice(-1) - 1].lat, 
              lng: ppspInfo.pet_services[window.location.href.slice(-1) - 1].lng
            }}
            onClick={() => {
              setSelectedService(ppspInfo.pet_services[window.location.href.slice(-1) - 1]);
            }}
          />
      )
      
      {selectedService && (
        <InfoWindow
          position={{
            lat: selectedService.lat, 
            lng: selectedService.lng
          }}
          onCloseClick={() => {
            setSelectedService(null);
          }}
        >
          <div>
            <h6>{selectedService.name}</h6>
            <p>{selectedService.address}</p>
          </div>
        </InfoWindow>

      )}
      
    </GoogleMap>
  );
}

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCdiyFwn90uHcb3owsMbVFikWXU6hQrrGI",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <ShowMap />;
}


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: "",
      sortValue: "",
      finalSortedProducts: ppspInfo.pet_services[window.location.href.slice(-1) - 1].available_services
    };
  }

  getSortParams = (sortType, sortValue) => {
    this.setState({
      sortType,
      sortValue
    });

    let sortedProducts = getSortedProducts(
      ppspInfo.pet_services[window.location.href.slice(-1) - 1].available_services && ppspInfo.pet_services[window.location.href.slice(-1) - 1].available_services,
      sortType,
      sortValue
    );
    this.setState({
      finalSortedProducts: sortedProducts
    });
  };

  render() {
    const { products } = this.props;
    const { getSortParams } = this;
    const { finalSortedProducts, sortType, sortValue } = this.state;
    const uniqueCategories = getIndividualCategories(products);
    const uniqueColors = getIndividualColors(products);

    return (
      <div className="body-wrapper space-pt--70 space-pb--120">
        <div className="shop-header bg-color--grey">
          <div className="container space-y--15">
            <div className="row align-items-center">
              <div className="col-3"> 
                <Link
                  to={process.env.PUBLIC_URL + "/home"}
                  className="back-link"
                >
                  {" "}
                  <FaAngleLeft /> Back
                </Link>
              </div>
              <div className="col-6">
                <h4 className="category-title text-center">
                  {sortType === "category" || ""
                    ? sortValue === ""
                      ? "All Categories"
                      : "sortValue"
                    : ppspInfo.pet_services[window.location.href.slice(-1) - 1].name}
                </h4>
              </div>
              <div className="col-3 text-right">
                <button
                  className="filter-trigger"
                  id="filter-trigger"
                  onClick={e => toggleShopTopFilter(e)}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="shop-filter" id="shop-filter-menu">
            <div className="container space-mt--15 space-mb--50">
              <div className="row">
                <div className="col-12">
                  <div className="shop-filter-block">
                    <h4 className="shop-filter-block__title space-mb--15">
                      Categories
                    </h4>
                    <div className="shop-filter-block__content">
                      {uniqueCategories ? (
                        <ul className="shop-filter-block__category">
                          <li>
                            <button
                              onClick={e => {
                                getSortParams("category", "");
                                setActiveSort(e);
                              }}
                            >
                              All
                            </button>
                          </li>
                          {uniqueCategories.map((category, key) => {
                            return (
                              <li key={key}>
                                <button
                                  onClick={e => {
                                    getSortParams("category", category);
                                    setActiveSort(e);
                                  }}
                                >
                                  {category}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        "No categories found"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <br></br>
        </div>
        <div display= "flex" justify-content= "center">
        <Map />
        </div>
        {/* shop products */}
        <ShopServices products={finalSortedProducts} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.productData.products,
    wishlistItems: state.wishlistData
  };
};

export default connect(mapStateToProps)(Shop) ;

