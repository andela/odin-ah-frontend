import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputStatusIcon, InputStatusLabel } from './ErrorLabel';
import { toSentenceCase } from '../../utils';

export default class Input extends Component {
  static getInputData(e) {
    const data = {};
    data[e.target.name] = e.target.value;
    return data;
  }

  constructor(props) {
    super(props);
    this.state = {};
    const { field } = this.props;
    this.state[field] = '';
  }

  update = (e) => {
    const data = Input.getInputData(e);
    this.props.onUpdate(data);
  };

  render() {
    const {
      fieldError, value, type, field, iconType, showLabel, placeholder
    } = this.props;

    const label = toSentenceCase(field);
    return (
      <div className="field">
        {showLabel && <label className="label">{label}</label>}
        <div className={`control has-icons-right ${(iconType) ? 'has-icons-left' : ''}`}>
          <input
            className={`input auth-input is-medium ${(fieldError) ? 'is-danger' : ''}`}
            type={type}
            placeholder={placeholder || `Enter ${label}`}
            value={value}
            onChange={this.update}
            onBlur={this.props.validateField}
            id={field}
            name={field}
          />
          {
            iconType && <span className="icon is-small is-left">
              <i className={`fa fa-${iconType}`}/>
            </span>
          }

          {fieldError && <InputStatusIcon type={'error'}/>}
        </div>
        {
          fieldError
          && <InputStatusLabel error={fieldError}/>
        }
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  fieldError: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  iconType: PropTypes.string,
  onUpdate: PropTypes.func,
  validateField: PropTypes.func,
};

Input.defaultProps = {
  showLabel: false,
  fieldError: null,
  field: '',
  value: null,
};
