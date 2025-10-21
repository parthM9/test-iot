import React from "react";
import { getAddressText } from "../../hooks/address";
import { formatDate } from "../../hooks/dates";
import { ITrackedConsignment } from "../../models/consignment";
import './ConsignmentDetails.scss';


function ConsignmentDetails(_props: any) {
  const consignment: ITrackedConsignment = _props.consignment;

  return (
    <React.Fragment>
      <div className={`${_props.className}`}>
        <h3 className="h5 mb-3">Customer</h3>
        <div className="d-flex flex-wrap detail-wrapper mb-4">
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Name</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {consignment.customerName ? 
              consignment.customerName : 'N/A'}
          </div>
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Reference</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {consignment.customerReference ? 
              consignment.customerReference : 'N/A'}
          </div>
        </div>

        <h3 className="h5 mb-3">Pickup</h3>
        <div className="d-flex flex-wrap detail-wrapper mb-4">
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Date</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {formatDate(consignment.pickedUp)}
          </div>
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Address</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {getAddressText(consignment.pickupAddress)}
          </div>
        </div>

        <h3 className="h5 mb-3">Service</h3>
        <div className="d-flex flex-wrap detail-wrapper mb-4">
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Name</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {consignment.serviceName}
          </div>
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Code</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {consignment.serviceCode}
          </div>
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Instructions</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {consignment.specialInstructions}
          </div>
        </div>

        <h3 className="h5 mb-3 me-auto">Items</h3>
        <div className="d-flex flex-wrap detail-wrapper">
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Total</strong>
          </div>
          <div className="col-12 col-md-8 p-2 d-flex">
            <span>{consignment.totalItems}</span>
            {/* <button type="button"
              className="btn btn-link btn-sm p-0 ms-auto"
              onClick={() => _props.onShowItems(true)}
            >
              <span>View items</span>
            </button> */}
          </div>
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Volume</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {consignment.totalVolume}
          </div>
          <div className="col-12 col-md-4 bg-gray-100 p-2">
            <strong>Weight</strong>
          </div>
          <div className="col-12 col-md-8 p-2">
            {consignment.totalWeight}
          </div>
        </div>
      </div>
    </React.Fragment>


  );
}

export default ConsignmentDetails;
