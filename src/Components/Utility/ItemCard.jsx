import React from 'react';
import PropTypes from 'prop-types';

export class ItemCard extends React.Component {
  render() {
    const { name, description, cost, sold } = this.props;

    const myStyle = {
      border: '2px solid black',
      width: '250px',
      height: '150px',
      borderRadius: '5px',
      padding: '10px',
      margin: '10px',
    };

    return (
      <div style={myStyle}>
       { !sold ? (
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Cost: {cost}</p>
        </div>) : (
          <h1 style={{ textAlign: 'center' }}>SOLD</h1>
        )} 
      </div>
    );
  }
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  sold: PropTypes.bool,
};

ItemCard.defaultProps = {
  sold: false,
}