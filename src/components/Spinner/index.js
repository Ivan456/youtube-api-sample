import React from 'react';

export default () => {
    return (
        <div style={center}>
            <div className="d-flex spinner-border" role="status"></div>
        </div>
    );
};

const center = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    /* bring your own prefixes */
    transform: 'translate(-50%, -50%)'
};
