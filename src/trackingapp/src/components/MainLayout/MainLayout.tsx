import axios from "axios";
import React, { useCallback } from "react";
import { useParams } from "react-router";
import { API_URL } from "./constants";
import { ITrackedConsignment } from "../../models/consignment";
import './MainLayout.scss';
import IoTLayout from "../IoTLayout/IoTLayout";
import NonIoTLayout from "../NonIoTLayout/NonIoTLayout";
import fpGlobe from '../../assets/vectors/fp-logo-globe.svg';
import { isIoTCustomer } from "../../hooks/consignment";

function MainLayout() {
  const [loading, setLoading] = React.useState(true);
  const [consignment, setConsignment]: any = React.useState<ITrackedConsignment | null>(null);
  const params: any = useParams();
  const [isIoT, setIsIot] = React.useState(false);

  document.title = 'Freight People ASN';

  /**
   * Get the consignment from the connote number. If no connote number, prompt
   * the user to search for one.
   */
  const getConnote = useCallback(async (params) => {
    // if the app loads without a connote number, prompt the user to search
    if (!params.connote) {
      setLoading(false);
      return;
    }

    // If there is a consignment number set, get the details from the server
    await axios.get(`${API_URL}${params.connote}`).then((res) => {
      return res.data;
    }).then((res: ITrackedConsignment) => {
      setConsignment(res);
      // Check if this consignment is an IoT customer so we know what interface
      // to display
      const isIoT = isIoTCustomer(res);
      setIsIot(isIoT);
      // Add class to the html body
      if (isIoT) {
        document.body.classList.add('iot');
      } else {
        document.body.classList.remove('iot');
      }

      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setConsignment(null)
      setLoading(false);
    });
  
  }, [])

  // When the component loads...
  React.useEffect(() => {
    setLoading(true);
    getConnote(params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <React.Fragment>
      { loading ? 
          <div 
            className="loading-screen position-fixed bg-white top-0 start-0 
              bottom-0 end-0 d-flex align-items-center flex-column"
          >
            <img src={fpGlobe} 
              style={{ maxWidth: 100 }}
              className="img-fluid mb-5 globe-loading" 
              alt="Freight People Logo"
            />
          </div>
        : isIoT ? <IoTLayout
          isLoading={loading}
          consignment={consignment}
          connote={params.connote}
        />
        : <NonIoTLayout 
            isLoading={loading}
            consignment={consignment}
            connote={params.connote}
          />
      }
    </React.Fragment>
  );
}

export default MainLayout;
