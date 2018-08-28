import React from 'react';

import './modal.css';

const Modal = ({ active, children }) => {
    
  if (active) {
    return (
      <div className="modal-content">{children}</div>
    );
  } 

  return null;
}

export default Modal;