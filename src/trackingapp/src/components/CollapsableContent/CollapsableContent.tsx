import React from "react";

function CollapsableContent(_props: any) {
  const [title] = React.useState<string>(_props.title ? _props.title : 'Button title');
  const [open, setOpen] = React.useState<boolean>(_props.open);
  const [icon, setIcon] = React.useState<string>((_props.open) ? 'expand_less' : 'expand_more');

  return <React.Fragment>
    <button type="button" 
      className="btn border-0 px-0 d-flex align-items-center w-100 CollapsableContent-btn"
      onClick={() => {
        const bool = !open;
        setOpen(bool)
        setIcon((bool) ? 'expand_less' : 'expand_more');
      }}
    >
      <strong className="me-auto">{title}</strong>
      <span className="material-icons me-3">{icon}</span>
    </button>
    <div className={`CollapsableContent ${open ? '' : 'd-none'} py-3 ${_props.className}`}>
      {_props.children}
    </div>
  </React.Fragment>
}

export default CollapsableContent;