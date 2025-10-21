import './ContactUs.scss';

function ContactUs(_props: any) {
  const { connote } = _props;

  return <div className={`ContactUs py-4 ${_props.className}`}>
    <div className="d-flex align-items-center" style={{
      color: '#787878'
    }}>
      <span className="material-icons-outlined me-3" style={{
        color: '#787878'
      }}>call</span>
      <span className="w-100">1800 621 036</span>
    </div>
    <hr className="my-3" />
    <a href={`mailto:pickups@freightpeople.com.au?subject=ASN Enquiry Re. Consignment# ${connote}`}
      className="d-flex align-items-center w-100 text-decoration-none"
      style={{
        color: '#787878'
      }}
    >
        <span className="material-icons-outlined me-3" style={{
          color: '#787878'
        }}>email</span>
        <span>pickups@freightpeople.com.au</span>
    </a>
  </div>
}

export default ContactUs;
