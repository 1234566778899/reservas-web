import React from 'react';

export const ModalApp = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }
    return (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)',display:'flex', justifyContent:'center',alignItems:'center' }}>
            <div style={{ background: 'white', width: '500px',padding:'10px',borderRadius:'3px' }}>
                <button onClick={onClose} className='btn'><i className="fa-solid fa-xmark"></i></button>
                {children}
            </div>
        </div>
    );
};

