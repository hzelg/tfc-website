import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grommet, Image, Header, Box, Nav, Text } from 'grommet';
import "./css/navbar.css";
import tfc_theme from '../constants/theme';
import UserNavBar from './AccountComponents/UserNavBar';
import APIContext from '../Contexts/APIContext';



const items = [
  { label: 'Home', href: "/home" },
  { label: 'Subscriptions', href: "/subscription_choices" },
  { label: 'Studios', href: "/studios" },
];

const userOnly = [
  { label: 'History', href: "/class_history" },
  { label: 'Schedule', href: "/class_schedule" },
  { label: 'Settings', href: "/settings" },
]

function NavbarComp() {
  const navigate = useNavigate();
  const { loggedIn } = useContext(APIContext)
  return (
    <Grommet theme={tfc_theme}>
      <div className="NavBar">
        <Header background="white" pad="small">

          {/* Logo */}
          <Image src="https://i.ibb.co/LtkKcGb/logo.png" alt="logo" border="0" className="HeaderLogo" />

          {/* Menu */}
          <Nav direction="row" gap="large" className="Menu" pad="small">
            {items.map((item) => (
              <div>
                <Box onClick={() => navigate(item.href)} key={item.label}> {item.label} </Box>
              </div>
            ))}
             {loggedIn && <Box width="large"></Box> }
            {loggedIn ?
              userOnly.map((item) => (
              <div>
                <Box onClick={() => navigate(item.href)} key={item.label}> {item.label} </Box>
              </div>
              ))
              : <></>}
          </Nav>

          <UserNavBar />

        </Header>
      </div>
    </Grommet>
  );
};

export default NavbarComp;