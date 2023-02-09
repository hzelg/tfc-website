import React from 'react';
import { Grommet, Box, Button, Carousel, Text } from 'grommet';
import "./css/carousel.css";
import {useNavigate} from 'react-router-dom';
import tfc_theme from "../constants/theme";

function CarouselComp(){

    const navigate = useNavigate();

  return(
   <Grommet theme= {tfc_theme}>
      <Box align="center" pad = "medium">
        <Carousel controls="arrows" className = "HomeImageSet" >

          <Box fill = "vertical" align="center" justify="center" gap="small" className = "slide-1" >
                <Box className = "HomeText">
                    <Text weight="bold" size="6xl" className = "slogan-1" color = "tfc-background-3" >
                        <div> Decide. </div>
                        <div> Commit. </div>
                        <div> Succeed. </div>
                    </Text>
                </Box>
                <Box pad = "medium">
                <Button primary align = "center" size="large" onClick={()=>navigate('/subscription_choices')}  label="Join Us!" color = "tfc-background-3" background = "tfc-background-3" className = "button"/>
                </Box>
          </Box>

                    <Box fill = "vertical" align="center" justify="center" gap="small" className = "slide-2" >
                <Box className = "HomeText">
                    <Text weight="bold" size="6xl" className = "slogan-1" color = "tfc-background-3" >
                        Sore today, strong tomorrow.
                    </Text>
                </Box>

                <Box pad = "medium">
                <Button primary align = "center" onClick={()=>navigate('/subscription_choices')} size="large" label="Join Us!" color = "tfc-background-3" background = "tfc-background-3" className = "button"/>
                </Box>
          </Box>

          <Box fill = "vertical" align="center" justify="center" gap="small" className = "slide-3" >
                <Box className = "HomeText">
                    <Text weight="bold" size="6xl" className = "slogan-1" color = "tfc-background-3" >
                        Make yourself stronger than your excuses.
                    </Text>
                </Box>
                <Box pad = "medium">
                <Button primary align = "center" size="large" onClick={()=>navigate('/subscription_choices')}  label="Join Us!" color = "tfc-background-3" background = "tfc-background-3" className = "button"/>
                </Box>
          </Box>
        </Carousel>
      </Box>
       </Grommet>
    );
}

export default CarouselComp;