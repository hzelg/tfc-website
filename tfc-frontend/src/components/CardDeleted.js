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


function CardDeleted(){

    const navigate = useNavigate();
    const location = useLocation();
    var ResCode = '';
    if(location.state != null){
       ResCode = location.state.rescode;
    }
    return(
        <Grommet theme = {tfc_theme}>
          {!AuthService.isLoggedIn() && <Navigate to="/not_auth" />}
             <div className="CardComp">
                <Box gap = "large">
                    {ResCode=="402"&&
                        <Text weight="bold" size="3xl">
                              Your card is successfully deleted.
                        </Text>}
                    {ResCode=="403"   &&
                        <Text weight="bold" size="3xl">
                              Not valid delete action. Check again or contact us.
                        </Text>}
                    <Box direction="row" gap = "medium">
                       <Button primary label ="Go back" onClick ={()=>{navigate('/settings/card/view')}}/>
                    </Box>
                </Box>
                </div>
          </Grommet>
    );
}

export default CardDeleted;