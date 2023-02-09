/* https://storybook.grommet.io/?path=/story/visualizations-notification-global--global */

import React, { useState, Component, useImperativeHandle, useEffect } from "react";
import {
  Button,
  NameValueList,
  NameValuePair,
  Notification,
  Header,
  Heading,
  Paragraph,
  Main,
  Box,
  Text,
  Tag,
} from 'grommet';
import { Grommet as GrommetIcon, AppsRounded } from 'grommet-icons';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import API from '../api';
import ClassesStudioAll from "../components/Classes/ClassStudioAll";
import ClassesContext, { useClassesContext } from "../components/Classes/ClassesContext";
import ClassesStudioSchedule from "../components/Classes/ClassesStudioSchedule";
import ClassesFilterBar from "../components/Classes/ClassesFilterBar";
import ClassDropEnrollClass from "../components/Classes/ClassEnrollDrop/DropEnrollClass";

function ClassDescriptionPage() {

  const navigation = useNavigate()
  const location = useLocation();
  var classID = location.state.class.id;
  console.log(location.state.class)
  const [data, setData] = useState([])

  const getClass = () => {
    API.get("classes/get_class_details/" + classID)
      .then(response => {
        console.log(response.data.results)
        setData(response.data.results)
      })
  }
  useEffect(() => {
    getClass()
  }, [])

  return (
    <>
      <Main gap="medium">
        <Box width="xlarge" margin="auto" pad="medium" gap="medium">
          <Header>
            <Heading margin="none">{location.state.class.name}</Heading>
          </Header>
          <Paragraph margin="none"  fill>
            {location.state.class.description}
          </Paragraph>

          <Heading margin="none" level={2}>
            Details
          </Heading>

          <NameValueList>
            <NameValuePair key='coach' name="Coach">
              {location.state.class.coach}
            </NameValuePair>
            <NameValuePair key='capacity' name="Capacity">
              {location.state.class.capacity}
            </NameValuePair>
            <NameValuePair key='keywords' name="Keywords">
              {location.state.class.keywords.join(", ")}
            </NameValuePair>
            <NameValuePair key='start-date' name="Start Date">
              {location.state.class.class_start_date}
            </NameValuePair>
            <NameValuePair key='end-date' name="End Date">
              {location.state.class.last_class_date}
            </NameValuePair>
            <NameValuePair key='end-time' name="Time">
              {location.state.class.class_start_time} - {location.state.class.class_end_time}
            </NameValuePair>
            <ClassDropEnrollClass class={location.state.class.id}></ClassDropEnrollClass>
          </NameValueList>
          {console.log(location.state.class)}
          {console.log("location.state.class")}
          <Box>
          </Box>
          <Box border="black" pad="100px 100px 0px 100px" className="classcard">
            <Header>
              <Heading style={{marginLeft:"30px"}} margin="none" level={2}>
                Class Instances
              </Heading>
              {/* <Button alignSelf="start" label="Search Instances" primary onClick={ () => navigation('/classes')}/> */}
            </Header>
            <div>
              <ClassesContext.Provider value={useClassesContext()}>
                <ClassesFilterBar />
                <ClassesStudioSchedule studioId={location.state.class.studio} needLogIn={false} class={location.state.class.id}/>
              </ClassesContext.Provider>
            </div>
          </Box>
        </Box>

      </Main>
    </>
  );
}

export default ClassDescriptionPage;