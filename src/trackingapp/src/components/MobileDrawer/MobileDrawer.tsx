import './MobileDrawer.scss';
import React, { useEffect, useRef } from 'react';
import Timeline from '../Timeline';
import ConsignmentDetails from '../ConsignmentDetails';
import { ITrackedConsignment } from '../../models/consignment';
import ConsignmentSummary from '../ConsignmentSummary';


/**
 * Hook that alerts clicks outside of the main menu
 */
function useOutsideAlerter(ref: any, isOpen: boolean, setOpen: any,
  setToggleDetails: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      // Check if the menu is currently open
      // If the menu isn't open then abort
      if (!isOpen) { return; }
      // If the click was outside the component, close the menu
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
        setToggleDetails(false)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen, setOpen, setToggleDetails]);
}

function MobileDrawer(_props: any) {
  const [toggleDetails, setToggleDetails] = React.useState(false);
  const wrapperRef = useRef(null);
  const consignment: ITrackedConsignment = _props.consignment;

  useOutsideAlerter(wrapperRef, _props.open, _props.setOpen, setToggleDetails);

  React.useEffect(() => {
    // When the mobile drawer is open we want to remove the ability to scroll
    // the body content
    if (_props.open) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [_props])
  
  return (
    <div  ref={wrapperRef}
      className="MobileDrawer position-fixed">
        <div className="bg-white rounded shadow">
          <button type="button" 
            className="d-flex align-items-center p-4 bg-transparent border-0 text-start w-100"
            onClick={() => {
              _props.setOpen(!_props.open)
            }}
          >
            <ConsignmentSummary 
              consignment={consignment}
              className={`me-auto`}
            />

            {
              (_props.open) ? <span className="material-icons">expand_more</span> :
                <span className="material-icons">expand_less</span>
            }
            
          </button>
          <div className={`MobileDrawer-content ${_props.open ? 'open mb-4' : ''}`}>
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

            <div className="px-3 overflow-auto MobileDrawer-content-inner hide-scrollbar">
            {
              toggleDetails ? (
                <ConsignmentDetails
                  consignment={consignment}
                  onShowItems={_props.onShowItems}
                  className="px-4 py-3"
                />
              ) : (
                <Timeline consignment={consignment} className={`px-4 py-3`} />
              )
            }
            </div>
          </div>
        </div>
    </div>
  )
}

export default MobileDrawer;
