import React, { useContext, useState, useEffect} from 'react';
import "./css/cardedit.css";
import { Currency, HomeRounded, Notification, User } from 'grommet-icons';
import { useNavigate, useLocation, Navigate} from 'react-router-dom';
import tfc_theme from '../constants/theme';
import APIContext from "../Contexts/APIContext";
import AuthService from "../services/auth-service";
import axios from "axios";
import { AnnounceContext, Button, Box,Form,  Tab, Tabs,  FormField, Card, TextInput, Paragraph, CardBody, CardFooter, Grid, Grommet, Heading, Text } from 'grommet';

const BACKEND_DOMAIN = "http://127.0.0.1:8000/"
const API_URL = BACKEND_DOMAIN + "subscriptions/api/"



function CardEdit(){

    const editcard = () => {

    }
    let notifcode = '';

    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState([]);
    const [notification, setNotification] = useState('');
    const [state, setState] = useState([]);
    const [card_num, setCardNum] = useState([]);
    const [card_holder_name, setCardHolder] = useState([]);
    const [cvc, setCvc] = useState([]);
    const [expire_date, setExpireDate] = useState([]);

    return(
    <>
        {!AuthService.isLoggedIn() && <Navigate to="/not_auth" />}

        <Grommet theme = {tfc_theme}>
            <div className = "updateForm">
            <Box fill align="center" justify="center">
                <Box width="medium">
                    <Form onSubmit = {()=> {
                    var form_data = {card_num, card_holder_name, cvc, expire_date, action:'update'}
                    console.log(form_data)
                    axios.post(API_URL+"card/", form_data, { headers: { Authorization: AuthService.authHeader() }})
                                    .then(response =>{ notifcode = response.data.code;})
                                    .then(()=>navigate('/settings/card/view', {state: {notif: notifcode}}))
}                    } >
                         <FormField label="Card Number" name="card_num" value={card_num}
                         onChange = {(event) => setCardNum(event.target.value)}
                          validate={[{ regexp: /^4[0-9]{12}(?:[0-9]{3})?$/}]}
                         required>
                            <TextInput aria-label="card_num" name="card_num"/>
                         </FormField>

                         <FormField label="Card Holder Name" name="card_holder_name" value={card_holder_name}
                         onChange = {(event) => setCardHolder(event.target.value)}
                         required>
                            <TextInput aria-label="card_holder_name" name="card_holder_name" type="name" />
                         </FormField>

                        <FormField label="cvc" name="cvc" value={cvc}
                         onChange = {(event) => setCvc(event.target.value)}
                         validate={[{ regexp: /^\d{3}$/}]}
                         required>
                            <TextInput aria-label="cvc" name="cvc" />
                        </FormField>

                        <FormField label="Expire Date" name="expire_date" value={card_num}
                         onChange = {(event) => setExpireDate(event.target.value)} required>
                            <TextInput aria-label="expire_date" name="expire_date" type="date" />
                        </FormField>

                    <Box direction="row" gap = "medium" justify="between" margin={{ top: 'medium' }}>
                        <Button type="reset" label="Reset" />
                        <Button type="submit" label="Add/Update" primary/>
                        <Button type="button" label="Cancel" onClick={()=>{navigate('/settings/card/view')}}/>
                    </Box>
                </Form>
            </Box>
        </Box>
        </div>

        </Grommet>
    </>
    );
}

export default CardEdit;