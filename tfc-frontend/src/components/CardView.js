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



function CardComp(){

    const location = useLocation();
    let ResCode = '';
    if(location.state != null){
       ResCode = location.state.notif;
    }
    const [showNotification, setShowNotification] = useState(true);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState([]);
    const [state, setState] = useState([]);
    const [value, setValue] = React.useState({ name: 'a', email: 'b' });
    const navigate = useNavigate();


    useEffect(() => {
       axios.get(API_URL+"card/",  { headers: { Authorization: AuthService.authHeader() }})
                  .then(response => {
                    console.log(response.data);
                    if(response.data.length == 0){
                         setState(false); }
                    else{
                        setData(response.data[0]);
                        setState(true);}})
                  .catch(error => {
                    navigate('/error')})
    },[])


    return(

        <Grommet theme = {tfc_theme}>
          {!AuthService.isLoggedIn() && <Navigate to="/not_auth" />}

           <div className = "action_notification">
            {  showNotification && ResCode =='400' &&
                <Notification status="normal"
                message={'The card is added'}
                onClose={() => {console.log("here1"); setShowNotification(false)}}/>
            }
            {  showNotification && ResCode =='401' &&
                <Notification status="normal"
                message={'The card is updated'}
                onClose={() => {console.log("here2"); setShowNotification(false)}}/>
            }
            {  showNotification && ResCode=='402' &&
                <Notification status="normal"
                message={'The card is deleted'}
                onClose={() => {console.log("here3");setShowNotification(false)}}/>
            }
            {  showNotification && ResCode=='406' &&
                <Notification status="warning"
                    message={"The card is invalid, please try a new card."}
                    onClose={() => {console.log("here4");setShowNotification(false)}}/>
            }
            {  showNotification && ResCode=='407' &&
                <Notification status="warning"
                    message={"Please enter all fields."}
                    onClose={() => {console.log("here5");setShowNotification(false)}}/>
                    }
           </div>


          {!state &&
             <div className="CardComp">
                <Box gap = "large">
                    <Text weight="bold" size="3xl">
                          You don't have a card yet.
                    </Text>
                    <Box direction="row" gap = "medium">
                       <Button primary label ="Add a card now!" onClick ={()=>{navigate('/settings/card/edit')}}/>
                    </Box>
                </Box>
                </div>
            }
          { state &&
            <div className = "Infobody"  align = "center">
                    <Text weight="bold" size= "3xl"> Your card information</Text>
                    <Box pad="large" gap="medium">
                        <Text> Card Number:         {data.card_num}</Text>
                        <Text> Expire Date:         {data.expire_date}</Text>
                    </Box>

                    <Box direction="row" pad = "large" className="buttons" gap = "medium">
                         <Button  align = "center" type="reset" label="Update" onClick ={()=>{navigate('/settings/card/edit')}}/>
                         <Button  primary align = "center" label="Delete" onClick ={
                         ()=>{
                          axios.post(API_URL+"card/", {action:"delete"}, { headers: { Authorization: AuthService.authHeader() }})
                                    .then(response =>{
                                        ResCode = response.data.code;
                                        setShowNotification(true);}
                                    )
                                    .then(() => navigate('/settings/card/delete', { state: { rescode : ResCode}}))
                         }}/>
                    </Box>
            </div>
          }

          </Grommet>
    );
}

export default CardComp;