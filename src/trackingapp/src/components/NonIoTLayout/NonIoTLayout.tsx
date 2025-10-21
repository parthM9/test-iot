import React from "react";
import { formatDate } from "../../hooks/dates";
import useWindowDimensions from "../../hooks/window";
import CollapsableContent from "../CollapsableContent";
import ConsignmentDetails from "../ConsignmentDetails";
import ConsignmentSummary from "../ConsignmentSummary";
import ContactUs from "../ContactUs";
import HeaderNonIot from "../HeaderNonIoT/HeaderNonIoT/HeaderNonIoT";
import MapBackground from "../MapBackground";
import MostRecentUpdate from "../MostRecentUpdate";
import NonIoTFooter from "../NonIoTFooter";
import Timeline from "../Timeline";
import TimelineHorizontal from "../TimelineHorizontal";

function NonIoTLayout(_props: any) {
  const windowSize = useWindowDimensions();
  const { consignment, connote } = _props;

  return (
    <React.Fragment>
      <HeaderNonIot
        className="mb-4 mb-lg-5"
        isLoading={_props.isLoading}
      />
      <div className="container px-4 d-flex flex-column flex-grow-1">
        {
          windowSize.width < 1280 ?
            <React.Fragment>
              <h2 className="h5 d-lg-none mb-4">Consignment information</h2>
              <div className="card shadow shadow-sm mb-5">
                <div className="card-body py-4 px-3 px-sm-4">
                  {
                    !consignment ?
                      !connote ? <span>No connote number provided.</span>
                        : 
                          <span>
                            Consignment "{connote}" could not be found. Please try 
                            another.
                          </span> 
                        : 
                          <React.Fragment>
                            <ConsignmentSummary 
                              className="mb-4"
                              consignment={consignment}
                            />
                            <hr className="mb-4" />
                            <MostRecentUpdate consignment={consignment} />
                            <hr className="" />
                            <CollapsableContent
                              open={true}
                              title={`Journey details`}
                            >
                              <Timeline consignment={consignment} className="py-4" />
                            </CollapsableContent>
                          </React.Fragment>
                  }
                </div>
              </div>
              { consignment && <React.Fragment>
                <div className="card shadow shadow-sm mb-5">
                  <div className="card-body px-3 px-sm-4">
                    <CollapsableContent
                      title="Consignment details"
                    >
                      <ConsignmentDetails consignment={consignment} />
                    </CollapsableContent>
                  </div>
                </div>
        
                <div className="position-relative mb-5 w-100">
                    <MapBackground 
                      consignment={consignment}
                      height={300}
                      padding={{ top: 32, left: 32, bottom: 32, right: 32 }}
                      includeRoute
                    />
                </div>
              </React.Fragment>}
      
              <div className="card shadow shadow-sm mb-5">
                <div className="card-body py-4 px-3 px-sm-4">
                  <h2 className="h6 fw-bolder mb-4">Contact us</h2>
                  <ContactUs connote={connote} />
                </div>
              </div>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="card">
                <div className="card-body px-4 py-5">
                  {
                    !consignment ?
                      !connote ? 
                        <span>No connote number provided.</span>
                        : 
                        <span>
                          Consignment "{connote}" could not be found. Please try 
                          another.
                        </span> 
                        : 
                        <React.Fragment>
                          <h2 className="h5 text-center mb-5">Consignment Tracking</h2>
                          <TimelineHorizontal 
                            consignment={consignment}
                            className="mb-4"
                          />

                          <div className="row">
                            <div className="col-6 pe-5">
                              <ConsignmentSummary 
                                className="mb-4"
                                consignment={consignment}
                              />
                              <hr className="mb-4" />
                              <MostRecentUpdate consignment={consignment} />
                              <hr className="mb-4" />
                              <h2 className="h6 mb-4" 
                                style={{ fontWeight: 700 }}
                              >Consignment details</h2>
                              <p className="text-muted mb-2">
                                Order reference: {consignment.customerReference}
                              </p>
                              <p className="text-muted mb-2">
                                Special instructions: {consignment.specialInstructions}
                              </p>
                              <p className="text-muted mb-2">
                                Estimated delivery: {formatDate(consignment.estimatedDelivery, { includeTime: true })}
                              </p>
                            </div>
                            <div className="col-6 ps-5">
                              <MapBackground 
                                consignment={consignment}
                                padding={{ top: 32, left: 32, bottom: 32, right: 32 }}
                                includeRoute
                              />
                            </div>
                          </div>
                        </React.Fragment>
                  }
                </div>
              </div>
            </React.Fragment>
        }
        <NonIoTFooter className="mt-auto" />
      </div>
    </React.Fragment>
  );
}

export default NonIoTLayout;