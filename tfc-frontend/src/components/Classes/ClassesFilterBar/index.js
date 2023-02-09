import React, { useState, useContext } from 'react';
import { PageHeader, Box, Button, Form, FormField } from "grommet";
import ClassesFormField from './ClassesFormField';
import ClassesContext from '../ClassesContext';
import "./style.css"
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'

const ClassesFilterBar = (props) => {

  const { setFilter } = useContext(ClassesContext)
  const [fromTime, setFromTime] = useState()
  const [toTime, setToTime] = useState()
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {...event.value}
    console.log(data)
    data.time_start = fromTime
    data.time_end = toTime
    data.date_after = fromDate
    data.date_before = toDate
    console.log(data)
    setFilter(data)
  }
  const handleReset = (event) => {
    setFilter({})
  }

  return (
    <Box direction="row" background="white" gap="xsmall" className="ClassHeader" justify='center'>
      {/* <PageHeader style={{ width: '300px' }} /> */}

    <div className ="filter">
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Box>

          <Box direction = "row" gap = "large" align="center" >
              <ClassesFormField name="name" label="Name" />
              <ClassesFormField name="coach" label="Coach" />

              <Box>
                <FormField name="time" htmlFor="time" label="Time Range">
                  <TimePicker onChange={setFromTime} value={fromTime} minutePlaceholder="mm" hourPlaceholder="hh" disableClock={true} />
                  <TimePicker onChange={setToTime} value={toTime} minutePlaceholder="mm" hourPlaceholder="hh" disableClock={true} />
                </FormField>
              </Box>

              <Box>
                <FormField name="date" htmlFor="date" label="Date Range">
                  <DatePicker onChange={setFromDate} value={fromDate}
                  dayPlaceholder="dd" monthPlaceholder="mm" yearPlaceholder="yyyy" disableClock={true} />
                  <DatePicker onChange={setToDate} value={toDate}
                  dayPlaceholder="dd" monthPlaceholder="mm" yearPlaceholder="yyyy" disableClock={true} />
                </FormField>
              </Box>

              <Box pad = "10px 0px 0px 0"  gap="medium">
                <Button type="reset" label="Reset" />
                <Button type="submit" primary label="Submit" />
              </Box>
          </Box>
          </Box>

      </Form>
      </div>
    </Box>
  );
};

export default ClassesFilterBar;