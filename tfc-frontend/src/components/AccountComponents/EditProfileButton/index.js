import React, { useEffect, useState } from "react";
import { Form, TextInputField, PasswordInputField, validators } from 'grommet-controls';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import AuthService from "../../../services/auth-service";
import { Button, Box } from "grommet";
import { useContext } from "react";
import APIContext from "../../../Contexts/APIContext"


const EditProfileButton = () => {

    const navigate = useNavigate();

  return (
    <div>
      <Button primary label = "Edit Profile" onClick = {()=> navigate("/edit_profile")}/>
    </div>
  )
}

export default EditProfileButton;