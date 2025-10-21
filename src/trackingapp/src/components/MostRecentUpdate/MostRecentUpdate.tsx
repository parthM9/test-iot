import React, { Fragment } from "react";
import { formatDate } from "../../hooks/dates";
import { getMilestone } from "../MilestoneEvent/MilestoneEvent";

function MostRecentUpdate(_props: any) {
  const { consignment } = _props;

  const sorted: any[] = consignment.events.sort((a: any, b: any) => {
    return new Date(b.eventTime).getTime() -
      new Date(a.eventTime).getTime()
  })

  const latest = sorted[0];

  return (
    <Fragment>
      <p>
        <strong>Most recent update</strong>
      </p>
      <p className="text-muted lead" style={{
        fontWeight: 400
      }}>{getMilestone(consignment.status)}</p>
      {
        latest ? <React.Fragment>
          <p className="text-muted mb-1 small">
            { !latest.eventTime ? 'Waiting for pickup' : latest.comments }
          </p>
          <p className="text-muted mb-4">
            <small>{formatDate(latest.eventTime, { includeTime: true })}</small>
          </p>
        </React.Fragment> : <React.Fragment>
          <p className="text-muted mb-1 small">
            { consignment.serviceName }
          </p>
        </React.Fragment>
      }
    </Fragment>
  );
}

export default MostRecentUpdate;