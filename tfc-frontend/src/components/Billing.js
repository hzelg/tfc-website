import "./css/billing.css";
import { Currency, HomeRounded, User } from 'grommet-icons';
import tfc_theme from '../constants/theme';
import PropTypes from 'prop-types';
import { FormCalendar } from 'grommet-icons';
import axios from "axios";
import { useNavigate, useLocation, Navigate} from 'react-router-dom';
import React, { useContext, useState, useEffect} from 'react';
import APIContext from "../Contexts/APIContext";
import AuthService from "../services/auth-service";
import { AnnounceContext, Notification, NameValuePair, NameValueList,Button, Box, Card, Paragraph, CardBody, CardFooter, Grid, Grommet, Heading, Text } from 'grommet';

const BACKEND_DOMAIN = "http://127.0.0.1:8000/"
const API_URL = BACKEND_DOMAIN + "subscriptions/api/"



const getCurrentSubscription = () => {
    axios.get(API_URL+"my_subscription/",  { headers: { Authorization: AuthService.authHeader() }})
                  .then(response => {
                  try{
                    const info = response.data;
                    return info;
                  }catch(err){ /* No subscription */
                    return null;
                  }
    })
}


function BillingComp(){

    const location = useLocation();
    let selectedPlan = '';
    if(location.state != null){
       selectedPlan = location.state.plan;
    }

    const [errorResponseCode, setErrorResponseCode] = useState([])
    const [autoCode, setAutoCode] = useState([])
    const [currentSub, setCurrentSub] = useState([])
    const [next_payment_date, setNextPayment] = useState([])
    const [start_date, setStartDate] = useState([])
    const [next_plan, setNextPlan] = useState('')
    const [price, setPrice] = useState([])
    const [showNotification, setShowNotification] = useState(true);
    const [action, setAction] = useState('') // If there is action from previous page.
    const [updateMessage, setUpdateMessage] = useState([]) // If there is action and update status from previous page.
    const navigate = useNavigate();

    useEffect(() => {
        if(selectedPlan != ''){
            console.log("not empty selected Plan");
            console.log(selectedPlan);

            let temp_action = '';
            console.log(next_plan)
            if( next_plan == "None" || !next_plan || next_plan == '' || next_plan == null){
                temp_action = 'subscribe';}
            else{
                temp_action = 'update';}

            console.log(temp_action);

            axios.post(API_URL+"my_subscription/",{ 'plan':selectedPlan, 'action':temp_action}, { headers: { Authorization: AuthService.authHeader() }} )
                .then((response) => {
                    if(response.data.code == "000" || response.data.code == "001"){
                        console.log("update success");
                        console.log("update success");
                        setCurrentSub(response.data.plan_title);
                        setNextPayment(response.data.next_payment_date);
                        setPrice(response.data.price);
                        setStartDate(response.data.start_date)
                        setNextPlan(response.data.next_plan)
                        setErrorResponseCode(response.data.code)
                        }
                    else{
                        console.log("not success");
                        setErrorResponseCode(response.data.code)
                    }})
         }

        axios.get(API_URL+"my_subscription/", { headers: { Authorization: AuthService.authHeader() }})
                      .then(response => {
                              if(response.data.code == '101'){ // no current subscription
                                    setCurrentSub(null)
                                    setErrorResponseCode(response.data.code);
                              }else if(response.data.code == '302'){ // no future subscription
                                    setCurrentSub(response.data.plan_title)
                                    setNextPayment(response.data.next_payment_date)
                                    setPrice(response.data.price);
                                    setStartDate(response.data.start_date)
                                    setNextPlan("None")
                                    setAutoCode(response.data.code)
                              }else if(response.data.code == '301' ||response.data.code == '300'  ){
                                    console.log(response.data)
                                    setCurrentSub(response.data.plan_title)
                                    setNextPayment(response.data.next_payment_date)
                                    setPrice(response.data.price);
                                    setStartDate(response.data.start_date)
                                    setNextPlan(response.data.next_plan)
                                    setAutoCode(response.data.code)
                              }
                      })
    },[]);


    return(
        <Grommet theme = {tfc_theme}>
            {!AuthService.isLoggedIn() && <Navigate to="/not_auth" />}

        <div className = "action_notification">
            { errorResponseCode=="000" && showNotification &&
                    <Notification status="normal"
                    message={'Successfully update your subscription'}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="001" && showNotification &&
                    <Notification status="normal"
                    message={'Successfully subscribe your subscription'}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="002" && showNotification &&
                    <Notification status="normal"
                    message={'Successfully cancel your subscription'}
                    onClose={() => setShowNotification(false)}/>
            }
            { autoCode =="300" && showNotification &&
                    <Notification status="normal"
                    message={'Auto payment has been made'}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="102" && showNotification &&
                    <Notification status="warning"
                    message={"You have a subscription now, but do not have any future subscription. Please subscribe"}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="103" && showNotification &&
                    <Notification status="warning"
                    message={'The plan is not valid'}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="104" && showNotification &&
                    <Notification status="warning"
                    message={"You dont have a valid card to pay yet"}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="105" && showNotification &&
                    <Notification status="warning"
                    message={"Not valid payment id."}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="106" && showNotification &&
                    <Notification status="warning"
                    message={"Sorry! This payment should not be made. Contact our helper."}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="107" && showNotification &&
                    <Notification status="warning"
                    message={'There is no subscription plan to choose from.'}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="108" && showNotification &&
                    <Notification status="warning"
                    message={"You already have future subscription, please choose to cancel first, and then subscribe."}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="109" && showNotification &&
                    <Notification status="warning"
                    message={'Not valid action'}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="201" && showNotification &&
                    <Notification status="warning"
                    message={'You dont have a subscription to cancel'}
                    onClose={() => setShowNotification(false)}/>
            }
            { errorResponseCode=="202" && showNotification &&
                    <Notification status="info"
                    message={'You already cancelled your future subscription, current subscription will stay valid till next payment date'}
                    onClose={() => setShowNotification(false)}/>
            }
        </div>

        {  !currentSub &&
                <div className="no_subscription_panel">
                <Box gap = "large">
                    <Text weight="bold" size="3xl">
                          You don't have a current plan.
                    </Text>
                    <Box direction="row">
                        <Button primary label="Go subscribe" onClick ={() => {navigate('/subscription_choices')}}/>
                    </Box>
                </Box>
                </div>
            }

        { currentSub &&
                    <div className ="subscription_panel" align = "center">
                        <Text weight="bold" align="center" size="3xl"> Current Plan </Text>
                    <NameValueList pad = "50px" gap="medium" align="center" nameProps={{ align: 'end' }}>
                        <NameValuePair key="current_sub" name="Current Subscription">
                          {currentSub}
                        </NameValuePair>
                        <NameValuePair key="start_date" name="Start Date">
                          {start_date}
                        </NameValuePair>
                        <NameValuePair key="price" name="Price">
                          {price}
                        </NameValuePair>
                        <NameValuePair key="next_payment_date" name="Next Payment Date">
                          {next_payment_date}
                        </NameValuePair>
                        <NameValuePair key="next_plan" name="Next Scheduled Plan">
                          {next_plan}
                        </NameValuePair>
                    </NameValueList>

                    <div className = "buttons">
                    <Box direction = "row" align = "center" gap = "medium">
                    <Button align = "center" label="Check my payment" onClick ={() => {navigate('/settings/payment')}}/>
                    <Button label = "Go add/update" onClick={()=> navigate('/subscription_choices')}/>
                    <Button primary label = "Delete" onClick={()=> { axios.post(API_URL+"my_subscription/",{action: 'cancel'}, { headers: { Authorization: AuthService.authHeader() }})
                        .then((response) => {
                            setErrorResponseCode(response.data.code)
                            navigate('/settings/subscription_delete')})
                        .catch(function(error){ navigate('/error')})}}/>
                    </Box>
                    </div>

                 </div>
        }

        </Grommet>
    );
}

export default BillingComp;