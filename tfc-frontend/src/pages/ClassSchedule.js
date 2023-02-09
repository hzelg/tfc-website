import React, { Component, useEffect, useState } from 'react';
import { PageHeader, Grommet, Anchor, Menu, List, InfiniteScroll, Box, Button, Card, Grid, Image, Text } from 'grommet';
import tfc_theme from '../constants/theme';
import ClassesContext, { useClassesContext } from "../components/Classes/ClassesContext";
import "./css/classes.css";
import ClassesUserSchedule from '../components/Classes/ClassesUserSchedule';

function ClassSchedule() {


  return (
    <ClassesContext.Provider value={useClassesContext()}>

      <Grommet theme={tfc_theme}>

        <PageHeader title="Class Schedule" style={{ width: '300px' }} className="PageHeader" />

        <ClassesUserSchedule />

      </Grommet>
    </ClassesContext.Provider>
  );
};

export default ClassSchedule;
