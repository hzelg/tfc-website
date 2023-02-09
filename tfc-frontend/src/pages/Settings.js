import React, { Component } from "react";
import "./css/settings.css";
import {User, Yoga, Database, CreditCard, More } from 'grommet-icons';
import { Grommet, Box, Tabs, Tab, PageHeader} from 'grommet';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate, useNavigate } from 'react-router-dom'
import tfc_theme from '../constants/theme';
import AuthService from "../services/auth-service";


function Settings(){
    const navigate = useNavigate();

    return(

    <Grommet theme={tfc_theme}>

        {!AuthService.isLoggedIn() && <Navigate to="/not_auth" />}
        <Box background="white" gap="xsmall" className="SettingHeader">
            <PageHeader title="Settings"  style={{ width: '300px' }} />
        </Box>

        <Box direction ="row">
            <div className = "Tabs">
                <Tabs pad="70px">
                    <Box  gap = "large">
                <Tab title={ <Box onClick={()=>navigate("/settings/my_subscription")}> Billing </Box> } icon={<CreditCard />}> </Tab>
                <Tab title={ <Box onClick={()=>navigate("/settings/payment")}> Payment History </Box> } icon={<Database />}> </Tab>
                <Tab title={ <Box onClick={()=>navigate("/settings/card/view")}> Card Info </Box> } icon={<CreditCard />}> </Tab>
                </Box>
                </Tabs>
            </div>
            <div className = "Body">
            <Outlet/>
            </div>
        </Box>

    </Grommet>
    );
}

export default Settings;
