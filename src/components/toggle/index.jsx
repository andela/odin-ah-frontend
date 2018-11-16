import React from 'react'
import  './toggle.scss';

export const Toggle = ({ isActive, toggleCheckBox, toggleName}) => (

    <div>
      <label className='switch'>
      <input type="checkbox" defaultChecked={ isActive }  name={ toggleName } onChange={ toggleCheckBox } />
      <span className='slider round'></span>
      </label>
    </div>
)

export default Toggle;