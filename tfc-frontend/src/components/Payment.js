import { Grommet,Button, Box, Card, Paragraph, CardBody, CardFooter, Grid, Heading, Text, Tab, Tabs, List, Menu} from 'grommet';
import "./css/payment.css";
import { Currency, HomeRounded, Notification, User, More, Flag, FormAdd} from 'grommet-icons';
import tfc_theme from '../constants/theme';
import APIContext from "../Contexts/APIContext";
import AuthService from "../services/auth-service";
import { useNavigate, useLocation, Navigate} from 'react-router-dom';
import React, { useContext, useState, useEffect} from 'react';
import axios from "axios";

const BACKEND_DOMAIN = "http://127.0.0.1:8000/"
const API_URL = BACKEND_DOMAIN + "subscriptions/api/"


function PaymentComp(){

    const [data, setData] = useState([])
    const [message, setMessage] = useState([])
    const [state, setState] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
       axios.get(API_URL+"payment/view/", { headers: { Authorization: AuthService.authHeader() }})
                  .then(response => {
                  var info = response.data
                  if(info.length == 0){
                     setMessage('No payment history');
                     setState(false);
                  }else{
                    setData(info);
                    setState(true);}})
                  .catch(error => {
                    navigate('/error');
                  })
    },[])


    return(

        <Grommet theme={tfc_theme}>
            {!AuthService.isLoggedIn() && <Navigate to="/not_auth" />}
             <div className="PaymentList">
                 <Box>
                    {state == true &&
                    <List data={data} action={(item, index) => (
                        <div className = "PaymentComp">
                            <Box direction = "row" gap = "xlarge">
                                <Box>
                                <Text>Date: {item.date}</Text>
                                <Text>Amount: {item.amount} </Text>
                                <Text>Card:{item.card_num} </Text>
                                <Text>Status: {item.status}</Text>
                                </Box>
                                <Menu key={item.id} icon={<More/>} hoverIndicator="true" items={[{icon: <Flag />, label: 'Report' }]}/>
                            </Box>
                        </div>
                        )} step={4} show={{ page: 1 }} paginate />
                    }{state == false &&
                            <div className="no_payment_panel">
                            <Box gap = "large">
                                <Text weight="bold" size="3xl">
                                      You don't have any payment history.
                                </Text>
                                <Box direction="row" gap = "medium">
                                    <Button primary label="Discover subscriptions" onClick ={() => {navigate('/subscription_choices')}}/>
                                    <Button label="Check your card" onClick ={() => {navigate('/settings/card/view')}}/>
                                </Box>
                            </Box>
                            </div>
                    }
                 </Box>
             </div>
        </Grommet>

    );
}

export default PaymentComp;