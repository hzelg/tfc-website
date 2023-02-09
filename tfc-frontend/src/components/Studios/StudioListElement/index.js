import React, { useContext } from 'react';
import { Box, Button, Card, Image, Text} from 'grommet';
import { FormNext} from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import "./style.css"
import APIContext from '../../../Contexts/APIContext';

function StudioListElement (props) {
  const navigation = useNavigate()
  
  return (
    <Card width="1100px"  pad="medium"  gap="large" round="medium"  flex="fixed">
      <Box direction="row" gap="large" justify="between" align="center">
        <Box direction="row" gap="medium">
          <Box width="xsmall" height="xsmall" background="orange!" round="small">
            <Image src= "https://i.ibb.co/2jNBdKP/Icon-3.png" />
          </Box>

          <Box>
            <Text size="large" color="text-strong" weight="bold" skeleton={{ width: 'small' }}>
            {props.data.name}
            </Text>
            <Text size="small">Location: {props.data.address}</Text>
            <Text size="small">Phone: {props.data.phone}</Text>
          </Box>
      </Box>
      <Button label="View Details" reverse icon={<FormNext />} secondary 
                    onClick={ () => {navigation('/studio_details', {state:{ studio: props.data }});}}/>
      {/* TODO: Add link to studio details! */}
      </Box>
    </Card>
  )
};

export default StudioListElement;