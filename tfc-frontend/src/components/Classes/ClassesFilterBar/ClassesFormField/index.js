import React from 'react';
import {FormField, TextInput } from "grommet";
import "./style.css"

const ClassesFormField = (props) => (
    <FormField name={props.name} htmlFor={props.name} label={props.label} className="ClassesFormField">
      <TextInput id={props.name} name={props.name} />
    </FormField>
  );

export default ClassesFormField;