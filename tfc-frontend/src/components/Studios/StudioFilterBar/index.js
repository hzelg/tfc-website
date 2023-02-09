import React, { useCallback, useState, useContext} from 'react';
import { PageHeader, Box, Button, Grommet, Form, FormField, TextInput, Layer} from "grommet";
import API from "../../../api"
import StudioSearchResult from '../../StudioSearchResult';
import tfc_theme from '../../../constants/theme';
import StudioFormField from './StudioFormField';
import StudioContext from '../StudioContext';
import "./style.css"
import MapPicker from '../../MapPicker';

const LocationPicker = () => {
  const [show, setShow] = useState();
  const { latitude, setLatitude,  longitude, setLongitude, filter, setFilter,}  = useContext(StudioContext)

  const leave = () => {
    // var newFilter = filter
    // console.log("here")
    // console.log(filter)
    // console.log(filter)
    // console.log(newFilter)
    // setFilter(newFilter)
    setShow(false)
  }

  return (
    <Box>
      <Button label="Location" onClick={() => setShow(true)} />
      {show && (
        <Layer
          style={{width:"500px", height:"500px"}}
          onEsc={leave}
          onClickOutside={leave}
        >
          {/* <StudioFormField name="latitude" label="Latitude" onChange= {event => setLatitude(event.target.value)} value={latitude}/>
          <StudioFormField name="longitude" label="Longitude" onChange={event => setLongitude(event.target.value)} value={longitude}/> */}
          <MapPicker/>
        </Layer>
      )}
    </Box>
  );
}


const StudioFilterBar = () => {
  const { latitude, longitude,setFilter } = useContext(StudioContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    var newFilter = {...event.value}
    newFilter.latitude = latitude
    newFilter.longitude = longitude
    console.log(event)
    console.log("jejejeje")
    setFilter(newFilter)
  }
  const handleReset = (event) => {
    setFilter({})
  }

  return (
      <Box direction="row" background="white" gap="xsmall" className="StudioHeader">
        <PageHeader title="Studios" style={{ width: '300px' }} />

       <div className = "filter">
        <Form onSubmit={handleSubmit} onReset={handleReset}>
           <Box>
                <Box direction="row" gap="small" align="center">
                <StudioFormField name="name" label="Name" />
                <StudioFormField name="coach" label="Coach" />
                <StudioFormField name="amenity" label="Amenity" />
                <StudioFormField name="class_name" label="Class Name" />

                <LocationPicker/>

                <Box direction="row" gap="medium">
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

export default StudioFilterBar;