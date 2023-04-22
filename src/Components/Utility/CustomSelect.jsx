import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../../Styles/utils.css';

export class CustomSelect extends Component {
  state = {
    selectedOption: 'Floor 1',
    showOptions: false,
    isDragging: false,
  };

  selectRef = React.createRef()

  componentDidMount() {
    const { options } = this.props;
    window.addEventListener('click', this.handleClickOutside);
    this.setState({ selectedOption: options[0] })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (!this.selectRef.current.contains(event.target)) {
      this.setState({ showOptions: false, isDragging: false });
    }
  }

  handleSelect = (option) => {
    const { changeFloor } = this.props;
    this.setState({
      selectedOption: option,
      showOptions: false
    });
    const numRegex = /floor\s(\d+|[1-9][0-9]|100)/i;
    const match = option.match(numRegex)[1];
    changeFloor(match)
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
    if (isDragging) {
      const deltaY = event.movementY || event.webkitMovementY || 0;
      const move = deltaY * 1.5
      this.selectRef.current.scrollTop -= move;
    }
  }

  handleMouseUp = () => {
    this.setState({ isDragging: false });
  }

  render() {
    const { options } = this.props;
    const { selectedOption, showOptions } = this.state;
    return (
      <div className="showFloorSelect" ref={this.selectRef}>
        <div
          className="customSelectSelected"
          onClick={this.toggleOptions}
        >
          { selectedOption  ?  selectedOption : options[0] }
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
  options: PropTypes.arrayOf(PropTypes.string),
  changeFloor: PropTypes.func,
}.isRequired
