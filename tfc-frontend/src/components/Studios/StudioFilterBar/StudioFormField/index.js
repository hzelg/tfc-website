import React from 'react';
import {FormField, TextInput } from "grommet";
import "./style.css"

const StudioFormField = (props) => (
    <FormField name={props.name} htmlFor={props.name} label={props.label} className="StudioFormField">
      <TextInput id={props.name} name={props.name} onChange={props.onChange} value={props.value}/>
    </FormField>
  );

export default StudioFormField;