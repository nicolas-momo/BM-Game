import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../../Styles/utils.css'

class CustomSelect extends Component {
  state = {
    selectedOption: this.props.options[0],
    showOptions: false,
    isDragging: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    const { optionsScroll } = this.props;
    if (!optionsScroll.current.contains(event.target)) {
      this.setState({ showOptions: false, isDragging: false });
    }
  }

  handleSelect = (option) => {
    this.setState({
      selectedOption: option,
      showOptions: false
    });
  };

  toggleOptions = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  };

  handleMouseDown = () => {
    this.setState({ isDragging: true, teste: false });
  }

  handleMouseMove = (event) => {
    const { isDragging } = this.state;
    const { optionsScroll } = this.props;
    if (isDragging) {
      const deltaY = event.movementY || event.webkitMovementY || 0;
      const move = deltaY * 1.5
      optionsScroll.current.scrollTop -= move;
    }
  }

  handleMouseUp = () => {
    this.setState({ isDragging: false });
  }

  render() {
    const { options, optionsScroll } = this.props;
    const { selectedOption, showOptions } = this.state;
    return (
      <div className="showFloorSelect" ref={optionsScroll}>
        <div
          className="customSelectSelected"
          onClick={this.toggleOptions}
        >
          {selectedOption ? selectedOption : options[0] }
        </div>
        {showOptions && (
          <div className="customSelectItems">
            {options.map((option, index) => (
              <div
                key={index}
                className={`customSelectItem`}
                onClick={ () => this.handleSelect(option)}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
              >
                {option === options[0] && option === selectedOption ? "" : option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  optionsScroll: PropTypes.object.isRequired,
};


export default CustomSelect;
