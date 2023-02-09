import React, { useContext, useState, useEffect} from 'react';
import "./css/cardview.css";
import { Currency, HomeRounded,  User } from 'grommet-icons';
import { useNavigate, useLocation, Navigate} from 'react-router-dom';
import tfc_theme from '../constants/theme';
import APIContext from "../Contexts/APIContext";
import AuthService from "../services/auth-service";
import axios from "axios";
import { AnnounceContext, NameValueList, Notification, NameValuePair, Button, Box,Form,  Tab, Tabs,  FormField, Card, TextInput, Paragraph, CardBody, CardFooter, Grid, Grommet, Heading, Text } from 'grommet';

const BACKEND_DOMAIN = "http://127.0.0.1:8000/"
const API_URL = BACKEND_DOMAIN + "subscriptions/api/"


function SubDeleted(){
    const navigate = useNavigate();
    return(
        <Grommet theme = {tfc_theme}>
          {!AuthService.isLoggedIn() && <Navigate to="/not_auth" />}
             <div className="CardComp">
                <Box gap = "large">
                    <Text weight="bold" size="3xl">
                          <div> Your future subscription is successfully cancelled. </div>
                          <div> Your current subscription is still valid. </div>
                    </Text>
                    <Box direction="row" gap = "medium">
                       <Button primary label ="Go back" onClick ={()=>{navigate('/settings/my_subscription')}}/>
                    </Box>
                </Box>
                </div>
          </Grommet>
    );
}

export default SubDeleted;