import React, { Component, useEffect, useState } from 'react';
import { PageHeader, Grommet, Anchor, Menu, List, InfiniteScroll, Box, Button, Card, Grid, Image, Text } from 'grommet';
import { FormNext, Flag, More, FormAdd } from 'grommet-icons';
import tfc_theme from '../constants/theme';
import FilterComp from "../components/Filter";
import ClassesFilterBar from "../components/Classes/ClassesFilterBar";
import ClassesContext, { useClassesContext } from "../components/Classes/ClassesContext";
import "./css/classes.css";
import ClassesStudioSchedule from '../components/Classes/ClassesStudioSchedule';

function Classes() {


  return (
    <ClassesContext.Provider value={useClassesContext()}>

      <Grommet theme={tfc_theme}>
                <ClassesFilterBar/>
            {/* <PageHeader title="Classes" style={{ width: '300px' }} className="PageHeader" /> */}

        <div className = "resultBody">
                <ClassesStudioSchedule studioId="1" needLogIn={false}/>
        </div>
        {/* <div className="ClassList">
        <Box pad="80px">
        <List data={data} action={(item, index) => (
          <div className="ClassComp">
          <Box>
          <Box>
                  <Anchor color="black" icon={<FormAdd />} size="large" hoverIndicator="brand" />
                  </Box>
                  <Menu key={index} icon={<More />} hoverIndicator="true" items={[{ icon: <Flag />, label: 'Report' }]} />
                  </Box>
                  </div>
                  )} step={4} show={{ page: 1 }} paginate />
                  </Box>
                </div> */}
      </Grommet>
    </ClassesContext.Provider>
  );
};

export default Classes;
