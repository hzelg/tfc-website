import React, { Component, useContext, useEffect, useImperativeHandle } from "react";
import "./css/studios.css";
import tfc_theme from '../constants/theme';
import { Box, Grommet} from "grommet";

import StudioFilterBar from "../components/Studios/StudioFilterBar";
import StudioList from "../components/Studios/StudioList";
import StudioContext, { useStudioContext } from "../components/Studios/StudioContext";


const Studios = () => {

  return (
    <StudioContext.Provider value={useStudioContext()}>

      <Grommet theme={tfc_theme}>

        <StudioFilterBar />

        <StudioList />
        {/* <Box className = "Result" pad = "large">
            {this.state.results}
          </Box> */}

        <Box>
          {/* <MapComponent/> */}
        </Box>

      </Grommet>
    </StudioContext.Provider>
  );
}

export default Studios;