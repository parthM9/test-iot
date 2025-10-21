import React from "react";
import { IAddress } from "../models/cario";

export const addrObjectToHtml = (addr: IAddress|undefined) => {
  if (!addr) { return 'No address provided'; }
  return (
    <React.Fragment>
      {addr.line1 && <p className="mb-2">{addr.line1}</p>}
      {addr.line2 && <p className="mb-2">{addr.line2}</p>}
      {addr.line3 && <p className="mb-2">{addr.line3}</p>}
      <p className="mb-2">
        <span>{addr.location.locality} </span>
        <span>{addr.location.state} </span>
        <span>{addr.location.postcode}</span>
      </p>
    </React.Fragment>
  )
}

/**
 * Format an address object in to a line of text
 * @param addr 
 * @returns 
 */
export const getAddressText = (addr: IAddress|undefined): string => {
  if (!addr) { return 'No address provided'; }

  return `${addr.location.locality}, ${addr.location.state}, 
    ${addr.location.postcode}, ${addr.location.country.name}`;
}
