import React from "react";
import { getAddressText } from "../../hooks/address";
import { formatDate } from "../../hooks/dates";
import { IEvent } from "../../models/cario";
import { ITrackedConsignment } from "../../models/consignment";
import MilestoneEvent from "../MilestoneEvent";
import './Timeline.scss';

type Props = {
  consignment: ITrackedConsignment;
  className?: string;
}

function Timeline(_props: Props) {
  const { consignment } = _props;
  const [ events, setEvents ] = React.useState<IEvent[]>([]);


  React.useEffect(() => {
    if (!consignment.events.length) { return; }
    const copy: IEvent[] = JSON.parse(JSON.stringify(consignment.events));
    const sorted = [...copy].sort((a, b) => {
      if (!a.eventTime || !b.eventTime) { return 0; }
      const prev = new Date(a.eventTime).getTime();
      const current = new Date(b.eventTime).getTime();
      return current - prev;
    })
    setEvents(sorted);
  }, [consignment])


  return <React.Fragment>
    <div className={`Timeline ${_props.className}`}>
      <div className={`journey-destination journey-step mb-5 position-relative
          ${ consignment.delivered ? 'journey-complete' : ''}`}
        >
        <small className="text-muted">
          { consignment.delivered ? 'Delivered' : 'Destination'}
        </small>
        <p className="mb-1">{getAddressText(consignment.deliveryAddress)}</p>
        { (consignment.estimatedDelivery && !consignment.delivered) &&
          <small className="text-muted ms-auto">
            <span className="me-auto">Estimated delivery: </span>
            <span>{formatDate(consignment.estimatedDelivery)}</span>
          </small>
        }
        {
          consignment.delivered &&
          <React.Fragment>
            <small className="text-muted ms-auto">
              <span className="me-auto">Delivered: </span>
              <span>{formatDate(consignment.delivered)}</span>
            </small>
          </React.Fragment>
        }
      </div>

      { // Iterate over the milestone events
        events.length ?  events.map((evt: IEvent, i: number) => (
          evt.milestone !== 'Delivered' &&
            <MilestoneEvent event={evt} key={i} />
        )) : ''
      }


      <div className="journey-step position-relative journey-origin">
        <div className="d-flex align-items-start">
          <small className="text-muted">Origin</small>
        </div>
        <p className="mb-1">{getAddressText(consignment.pickupAddress)}</p>
        { consignment.pickupDate &&
          <small className="text-muted ms-auto">
            <span className="me-auto">Scheduled pickup: </span>
            <span>{formatDate(consignment.pickupDate)}</span>
          </small>
        }
      </div>
    </div>
  </React.Fragment>
}

export default Timeline;
