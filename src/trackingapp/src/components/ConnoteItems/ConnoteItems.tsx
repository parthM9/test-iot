import { ITrackedConsignment } from '../../models/consignment';
import './ConnoteItems.scss';

type Props = {
  consignment: ITrackedConsignment;
  open: boolean;
  onClose: (value: boolean) => void;
}

function ConnoteItems(_props: Props) {
  const consignment = _props.consignment;

  return (
    <div className={`bg-white sidepanel ${_props.open ? 'open shadow' : ''}`}>
      <div className="d-flex align-items-center p-3">
        <h3 className="mb-0 h4">Consignment items</h3>
        <button type="button"
          onClick={() => _props.onClose(false)}
          className={
            `bg-transparent border-0 btn-sm btn d-flex align-items-center ms-auto`
          }>
          <span className="material-icons md-18">close</span>
        </button>
      </div>

      <div className="p-3 responsive-table">
      {
        consignment.transportUnits && consignment.transportUnits.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Reference</th>
                <th>Description</th>
                <th>Type</th>
                <th>Vol.</th>
                <th>Height.</th>
                <th>Width.</th>
              </tr>
            </thead>
            <tbody>
              {
                consignment.transportUnits.map((unit, i) => {
                  return <tr key={i}>
                    <td>{unit.code}</td>
                    <td>{unit.reference}</td>
                    <td>{unit.description}</td>
                    <td>{unit.transportUnitType}</td>
                    <td>{unit.volume}</td>
                    <td>{unit.height}</td>
                    <td>{unit.width}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No items in this consignment</p>
        )
      }
      </div>
    </div>
  );
}

export default ConnoteItems;
