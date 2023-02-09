import React, { Component, useEffect, useState } from 'react';
import { PageHeader, Grommet, Anchor, Menu, List, InfiniteScroll, Box, Button, Card, Grid, Image, Text } from 'grommet';
import { FormNext, Flag, More, FormAdd } from 'grommet-icons';
import tfc_theme from '../constants/theme';
import FilterComp from "../components/Filter";
import ClassesFilterBar from "../components/Classes/ClassesFilterBar";
import ClassesContext, { useClassesContext } from "../components/Classes/ClassesContext";
import "./css/classes.css";
import ClassesStudioSchedule from '../components/Classes/ClassesStudioSchedule';
import ClassesUserHistory from '../components/Classes/ClassesUserHistory';

function ClassHistory() {

  return (
    <ClassesContext.Provider value={useClassesContext()}>

      <Grommet theme={tfc_theme}>

        <PageHeader title="Class History" style={{ width: '300px' }} className="PageHeader" />

        <ClassesUserHistory/>

      </Grommet>
    </ClassesContext.Provider>
  );

};

export default ClassHistory;
