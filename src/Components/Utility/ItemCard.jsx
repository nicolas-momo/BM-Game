import React from 'react';
import PropTypes from 'prop-types';

export class ItemCard extends React.Component {
  render() {
    const { name, description, cost } = this.props;

    const myStyle = {
      border: '2px solid black',
      width: '80%',
      height: '80%',
      borderRadius: '5px',
      padding: '10px',
      margin: '5%',
    };

    return (
      <div style={myStyle}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Cost: {cost}</p>
      </div>
    );
  }
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired
};
