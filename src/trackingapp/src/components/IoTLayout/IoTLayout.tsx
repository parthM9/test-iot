import React from "react";
import useWindowDimensions from "../../hooks/window";
import fpLogo from '../../assets/vectors/fp-logo.svg';
import MobileDrawer from "../MobileDrawer";
import ConsignmentSummary from "../ConsignmentSummary";
import Search from "../Search";
import ConsignmentDetails from "../ConsignmentDetails";
import Timeline from "../Timeline";
import MapBackground from "../MapBackground";
import Header from "../Header";
import MainMenu from "../MainMenu";

function IoTLayout(_props: any) {
  const windowSize = useWindowDimensions();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [toggleDetails, setToggleDetails] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { isLoading, consignment, connote } = _props;
  
  // When the map is clicked we want to hook in to that event
  const handleMapClick = (eventData: any) => {
    // Close the main menu if it's open
    setMenuOpen(false);
    // Close the mobile drawer if it's open
    setDrawerOpen(false);
  }


  return (
    <React.Fragment>
      <MainMenu 
        isOpen={menuOpen}
        consignment={consignment}
        onClose={setMenuOpen}
        onSearch={setSearchOpen}
      /> 
      {
        windowSize.width >= 1024 ? (
          <React.Fragment>
            <div className="d-flex flex-grow-1 bg-off-white h-100">
              <div className="bg-white w-100 d-flex flex-column flex-grow-1" style={{ maxWidth: 450 }}>
                <div className="d-flex align-items-center px-3 py-3 bg-white shadow position-relative">
                  {/* Menu Button */}
                  <button type="button"
                    className={
                      `p-2 bg-white border-0 rounded-circle d-flex align-items-center
                      justify-content-center`
                    }
                    aria-label="Open Menu"
                    onClick={() => setMenuOpen(true)}
                  >
                    <span className="material-icons">menu</span>
                  </button>
                  <a href="http://www.freightpeople.com.au"
                    className="d-block ms-3"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img src={fpLogo}
                      alt="Freight people logo"
                      style={{ maxWidth: 150 }}
                    />
                  </a>

                  <Search
                    onShowSearch={setSearchOpen}
                    showSearch={searchOpen}
                  />
                </div>

                {
                  <React.Fragment>
                  { // If the data has finished loading...
                    !consignment ? ( 
                      <div className="p-4">
                        <p className="text-muted">
                          {!connote ? (
                            // If no consignment number has been provided...
                            <span>No consignment number provided. Search for a consignment</span>
                          ) : (
                            // If the consignment wasn't found
                            <span>Consignment "{connote}" could not be found. Please try another.</span>
                          )}
                        </p>
                      </div>
                    ) : ( // If a consignment is returned from the search
                      <React.Fragment>

                        <ConsignmentSummary 
                          consignment={consignment}
                          className={`px-4 py-5`}
                        />

                        {/* TABS */}
                        <div className="px-4 border-bottom tabs">
                          <button type="button"
                            className={`btn bg-transparent
                              ${toggleDetails ? 'text-muted' : 'active-tab text-secondary border-top border-start border-end'}`
                            }
                            onClick={() => {
                              setToggleDetails(false);
                            }}
                          >
                            <span>Journey</span>
                          </button>
                          <button type="button"
                            className={`btn bg-transparent
                              ${!toggleDetails ? 'text-muted' : 'active-tab text-secondary border-top border-start border-end'}`
                            }
                            onClick={() => {
                              setToggleDetails(true);
                            }}
                          >
                            <span>Details</span>
                          </button>
                        </div>
                        <div className="overflow-auto hide-scrollbar py-3">
                        {
                          toggleDetails ? (
                            <ConsignmentDetails
                              consignment={consignment}
                              className="px-4 py-3"
                            />
                          ) : (
                            <Timeline 
                              consignment={consignment}
                              className={`px-4 py-3`}
                            />
                          )
                        }
                        </div>

                      </React.Fragment>
                    )
                  }
                  </React.Fragment>
                }
              </div>
              <div className="position-relative overflow-hidden flex-grow-1">
                <MapBackground
                  containerClass="position-absolute top-0"
                  consignment={consignment}
                  onClick={handleMapClick}
                  includeRoute
                />
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
              !isLoading &&
                <MapBackground
                  consignment={consignment}
                  onClick={handleMapClick}
                  containerClass="position-absolute top-0"
                />
            }
            <div className="d-flex flex-column flex-grow-1">
              <Header
                onOpen={setMenuOpen}
                showSearch={searchOpen}
                onShowSearch={setSearchOpen}
                isLoading={isLoading}
              />
              { // When the loading is finished, and if there's a consignment. Show
                // the bottom panel
                (!isLoading && consignment) &&
                  <MobileDrawer 
                    open={drawerOpen}
                    setOpen={setDrawerOpen}
                    consignment={consignment}
                  />
              }
            </div>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
}

export default IoTLayout;