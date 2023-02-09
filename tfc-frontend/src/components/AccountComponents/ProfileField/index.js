import React from "react";
import {Text, Box} from "grommet";
import AuthService from "../../../services/auth-service";
import './style.css';

const ProfileField = (props) => {
  let user_data = AuthService.getCurrentUser()
  return (
    <Box className="ProfileEntry"> <Text size = "large"> {props.label}:  {user_data[props.field] == null ? "" : user_data[props.field]}  </Text></Box>
  )
}

export default ProfileField