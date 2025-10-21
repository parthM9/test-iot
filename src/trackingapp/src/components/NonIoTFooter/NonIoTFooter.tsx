import './NonIoTFooter.scss';

function NonIoTFooter(_props: any) {
  const year = new Date().getFullYear();

  return <div className={`NonIoTFooter py-4 ${_props.className}`}>
    <p className="mb-0 small" style={{
      color: '#c4c4c4'
    }}>
      <a href="http://www.freightpeople.com.au" 
        title="Freight People Website"
        className="text-decoration-none d-inline-block"
      >
        <span>Visit our website</span>
      </a>
      <span className="d-inline-block mx-3">|</span>
      <a href="mailto:pickups@freightpeople.com.au" 
        title="Contact us"
        className="text-decoration-none d-inline-block"
      >
        <span>Contact us</span>
      </a>
      <span className="d-inline-block mx-3">|</span>
      <span>Copyright &copy; Freight People {year}</span>
    </p>
  </div>
}

export default NonIoTFooter;
