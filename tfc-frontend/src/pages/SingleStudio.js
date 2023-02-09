/* https://storybook.grommet.io/?path=/story/visualizations-notification-global--global */

import React, { useState, useEffect} from "react";
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
  Carousel,
  Image
} from 'grommet';
import API from '../api';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import ClassesStudioAll from "../components/Classes/ClassStudioAll";
import ClassesContext, { useClassesContext } from "../components/Classes/ClassesContext";
import ClassesFilterBar from "../components/Classes/ClassesFilterBar";
import ClassesStudioSchedule from "../components/Classes/ClassesStudioSchedule";

function StudioDescriptionPage() {

  const navigation = useNavigate()
  const location = useLocation();
  var studioID = location.state.studio.id;

  const [data, setData] = useState([])

  const getClasses = () => {
    API.get("classes/get_all_studio_classes/" + studioID)
      .then(response => {
        setData(response.data.results)
      })
  }

  useEffect(() => {
    getClasses()
  }, [])

  return (
    <>
      <Main gap="medium">
        <Box width="xlarge" margin="auto" pad="medium" gap="medium">
          <Header>
            <Heading margin="none">{location.state.studio.name}</Heading>
          </Header>
          {location.state.studio.image_set.length > 0 ?
            <Box height="medium" width="large" overflow="hidden">
              <Carousel fill>
                {
                  location.state.studio.image_set.map((item) => 
                  (<Image fit="cover" src={item.upload} />) )
                }
              </Carousel>
            </Box>
            : <></>}
          <Heading margin="none" level={2}>
            Details
          </Heading>

          <NameValueList>
            <NameValuePair key='name' name="Name">
              {location.state.studio.name}
            </NameValuePair>
            <NameValuePair key='phone' name="Phone">
              {location.state.studio.phone}
            </NameValuePair>
            <NameValuePair key='address' name="Address">
              {location.state.studio.address}
            </NameValuePair>
            <NameValuePair key='postal_code' name="Postal Code">
              {location.state.studio.postal_code}
            </NameValuePair>
            <NameValuePair key='location' name="Location">
              {location.state.studio.location}
            </NameValuePair>

          </NameValueList>

          <Header>
            <Heading margin="none" level={2}>
              Available Classes
            </Heading>
            {/* <Button alignSelf="start" label="See All Classes Instances" primary onClick={ () => navigation('/classes')}/> */}
          </Header>

          <ClassesContext.Provider value={useClassesContext()}>
            <ClassesStudioAll studioId={studioID} needLogIn={false} />
          </ClassesContext.Provider>


          <Box border="black" pad="100px 100px 0px 100px" className="classcard">
            <Header>
              <Heading style={{marginLeft:"30px"}} margin="none" level={2}>
                Studio Schedule
              </Heading>
              {/* <Button alignSelf="start" label="Search Instances" primary onClick={ () => navigation('/classes')}/> */}
            </Header>
            <div>
              <ClassesContext.Provider value={useClassesContext()}>
                <ClassesFilterBar />
                <ClassesStudioSchedule studioId={location.state.studio.id} needLogIn={false} />
              </ClassesContext.Provider>
            </div>
          </Box>
        </Box>
      </Main>
    </>
  );
}

export default StudioDescriptionPage;