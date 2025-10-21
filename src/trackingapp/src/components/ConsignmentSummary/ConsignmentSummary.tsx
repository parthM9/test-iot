import React from 'react';
import box from '../../assets/images/box.png';
import { ITrackedConsignment } from '../../models/consignment';
import { getMilestone } from '../MilestoneEvent/MilestoneEvent';

function ConsignmentSummary(_props: any) {
  const consignment: ITrackedConsignment = _props.consignment;
  const [status, setStatus] = React.useState<string>('');

  // Update the status text when the consignment changes
  React.useEffect(() => {
    setStatus(getMilestone(consignment.status) || "");
  }, [consignment, setStatus])


  return (
    <div className={`d-flex align-items-center ${_props.className}`}>
      <div className="d-flex align-items-center justify-content-center rounded-circle me-3"
        style={{ height: 52, width: 52, backgroundColor: '#E6E6E6' }}
      >
        <img src={box} 
          style={{ width: 42, height: 'auto' }}
          alt="Cardboard box" 
          aria-hidden="true" 
          className=""
        />
      </div>

      <div className="mb-1 me-auto">
        <small className="text-muted">{consignment.connoteNumber}</small>
        <p className="h3 mb-0">{status}</p>
      </div>
    </div>
  );
}

export default ConsignmentSummary;