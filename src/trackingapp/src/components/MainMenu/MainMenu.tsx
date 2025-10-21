
import { useEffect, useRef } from 'react';
import './MainMenu.scss';
import fpLogo from '../../assets/vectors/fp-logo.svg';
import { ITrackedConsignment } from '../../models/consignment';
import React from 'react';

/**
 * Hook that alerts clicks outside of the main menu
 */
 function useOutsideAlerter(ref: any, props: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      // Check if the menu is currently open
      // If the menu isn't open then abort
      if (!props.isOpen) { return; }
      const isNotChild = ref.current && !ref.current.contains(event.target);
      // If the click was outside the component, close the menu
      if (isNotChild) { props.onClose(false); }
    }

    // Bind the event listener for clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, props]);
}

/**
 * Hook that checks each button press. If the menu is open, and the button that
 * was pressed was the escape button... close the menu.
 * @param props Component props
 * @returns 
 */
function checkButtonPress(props: any) {
  function handleEscPress(event: any) {
    // Check if the menu is currently open
    // If the menu isn't open then abort
    if (!props.isOpen) { return; }
    const isEscBtn = event.key && event.key === 'Escape';
    // If the keypress was the escape button, close the menu
    if (isEscBtn) { props.onClose(false); }
  }
  // Bind the event listener for esc button press
  document.addEventListener("keydown", handleEscPress);
  return () => {
    // Unbind the event listener on clean up
    document.removeEventListener("keydown", handleEscPress);
  };
}

function MainMenu(_props: any) {
  const wrapperRef = useRef(null);
  const consignment: ITrackedConsignment = _props.consignment;
  const [connote, setConnote] = React.useState('');
  useOutsideAlerter(wrapperRef, _props);
  checkButtonPress(_props);

  const year = new Date().getFullYear();

  React.useEffect(() => {
    if (consignment) { setConnote(consignment.connoteNumber) }
  }, [consignment])

  return (
    <div ref={wrapperRef}
      className={`bg-white position-fixed d-flex flex-column h-100 p-3
        main-menu ${_props.isOpen ? 'open shadow' : '' }`
      }
    >
      <div className="d-flex align-items-center" style={{marginBottom: 56 }}>
        <a href="http://www.freightpeople.com.au"
          className="d-block"
          target="_blank"
          rel="noreferrer"
        >
          <img src={fpLogo} 
            style={{ maxWidth: 150 }}
            className="img-fluid" 
            alt="Freight People Logo"
          />
        </a>
        <button type="button"
          aria-label="Close menu"
          onClick={() => _props.onClose(false)}
          className={
            `ms-auto p-2 border-0 bg-transparent d-flex align-items-center
            justify-content-center`
          }
        >
          <span className="material-icons">close</span>
        </button>
      </div>

      <ul className="list-unstyled" style={{ color: '#555B5A' }}>
        <li className="mb-4">
          <button type="button"
            className="btn btn-link p-0 text-muted text-decoration-none"
            onClick={() => {
              _props.onClose(false)
              _props.onSearch(true)
            }}
          >Track a consignment</button>
        </li>
        <li className="mb-4">
          <a href={`mailto:pickups@freightpeople.com.au?subject=ASN Enquiry Re. Consignment# ${connote}`}
            className="text-muted text-decoration-none"
          >
            Contact us
          </a>
        </li>
      </ul>

      <div className="mt-auto" style={{ color: '#C4C4C4'}}>
        <small>Copyright &copy; Freight People {year}</small>
      </div>
    </div>
  );
}

export default MainMenu;
