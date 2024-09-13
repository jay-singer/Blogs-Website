import { MDBBadge } from 'mdb-react-ui-kit';
import React from 'react';

const Badge = ({ children, styleInfo }) => {
  const colorKey = {
    Fashion: 'primary',   // lowercase Bootstrap color names
    Travels: 'success',
    Fitness: 'danger',
    Tech: 'info',
    Food: 'warning',
    Sports: 'dark'
  };

  return (
    <h5 style={styleInfo}>
      <MDBBadge color={colorKey[children] || 'secondary'}>
        {children}
      </MDBBadge>
    </h5>
  );
};

export default Badge;
