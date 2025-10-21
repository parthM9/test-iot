import React from "react";
import { formatDate } from "../../hooks/dates";
import { IEvent } from "../../models/cario";

export function getMilestone(milestone?: string | undefined) {
  if (milestone && milestone.toLowerCase() === "manifested") {
    return "Dispatched from Warehouse"
  }
  return milestone;
}

function MilestoneEvent(_props: { event: IEvent, horizontal?: boolean | undefined }) {
  const event = _props.event;
  const Tag = (_props.horizontal) ? 'p' : 'small';

  return (
    <React.Fragment>
      {
        event &&
        <div className="journey-step mb-5 position-relative">
          <div className="">
            <Tag className={`text-muted ${_props.horizontal ? 'mb-2' : ''}`}>
              {getMilestone(event.milestone)}
            </Tag>
          </div>
          <small className="text-muted ms-auto">
            <span>{formatDate(event.eventTime, { includeTime: true })}</span>
          </small>
        </div>
      }
    </React.Fragment>
  );
}

export default MilestoneEvent;
