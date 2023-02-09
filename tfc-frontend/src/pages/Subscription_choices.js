import React, { useState, useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import tfc_theme from '../constants/theme';
import {FormCalendar} from 'grommet-icons';
import "./css/subscription_choices.css"
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth-service";
import { AnnounceContext, Button, Box, Card, CardBody, CardFooter, Grid, Grommet, Heading, Text } from 'grommet';

const BASE = "http://localhost:3000/"
const BACKEND_DOMAIN = "http://127.0.0.1:8000/"
const API_URL = BACKEND_DOMAIN + "subscriptions/api/"

const Announcer = ({ announce, message, mode, role }) => {
  React.useEffect(() => {
    const timeout = 3000;
    announce(message, mode, timeout);
  }, [announce, message, mode]);

  return (
    <Text align="center" role={role} aria-live={mode}>
      {message}
    </Text>
  );
};

Announcer.propTypes = {
  announce: PropTypes.func.isRequired,
  message: PropTypes.string,
  mode: PropTypes.string,
  role: PropTypes.string,
};

const AnnounceContextComponent = props => (
  <Grommet theme={tfc_theme}>
  <div className = "Header">
    <Box justify="center" align="center" className="slide" fill>
      <Heading>Helping you to take fitness to the top level.</Heading>
      <AnnounceContext.Consumer>
        {announce => <Announcer announce={announce} {...props}/>}
     </AnnounceContext.Consumer>
    </Box>
  </div>
  </Grommet>
);


const Identifier = ({title, price}) => (
  <Box gap="small" align="center" direction="row" pad="small">
    <Box>
      <Text size="xlarge" weight="bold">
        {title}
      </Text>
      <Text size="xlarge" weight="bold">
              {'$'+price}
      </Text>
    </Box>
  </Box>
);



function Subscription_choices(){

    const [data, setData] = useState([])
    const [selectedPlan, setSelectedPlan] = useState('')
    const navigation = useNavigate()

    const getSubscriptionChoices = () => {
        axios.get(API_URL+"view/all/")
              .then(response => {
                setData(response.data)
        })
    }

    useEffect(() => {
      getSubscriptionChoices()
    }, [])


    if(data.length == 0){
    return(

          <Grommet theme={tfc_theme}>
              <div>
                  <AnnounceContextComponent
                    message="Plan details are coming. Stay tuned!"
                    mode="assertive"
                  />
              </div>

              <div align="center" className = "noDataButton">
                 <Button primary label="Back to Home Page" onClick={() => navigation('/home')}/>
              </div>
          </Grommet>);
    }
    else{
    return(

        <Grommet theme={tfc_theme}>
                  <div>
                      <AnnounceContextComponent
                        message="Join us and choose your subscription plan today"
                        mode="assertive"
                      />
                  </div>
                  <div className = "Choices">
                        <Box align ="center" pad="70px 50px 0">
                        <Grid columns="small" gap="small">
                             {data.map((value) => (
                                <div  className ="choice" >
                                <Card background = "white" key={value.title}
                                    onClick={() => { setSelectedPlan(value.title)}}>
                                    <CardBody pad="small">
                                    <Identifier title={value.title}  price={value.price}>
                                    </Identifier>
                                    </CardBody>
                                </Card>
                                </div> ))}
                        </Grid>
                        </Box>
                      <Box align ="center" className = "Submit">
                            {AuthService.isLoggedIn() &&
                                <Button primary label="I've decided!" onClick = { () => {console.log(selectedPlan);
                                    navigation('/settings/my_subscription', {state:{ plan: selectedPlan }});}}/>}
                        {!AuthService.isLoggedIn() &&
                                <Button primary label="Login to subscribe" onClick = { () => {navigation('/login')}}/>}
                      </Box>
                  </div>
              </Grommet>
            );
        }
};

export default Subscription_choices;