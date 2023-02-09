import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Form, TextInputField, PasswordInputField, EmailInputField, validators } from 'grommet-controls';
import { Button, Box, FileInput, FormField, PageHeader } from "grommet";
import AuthService from "../../../services/auth-service";
import './style.css';
import { useContext } from "react";
import APIContext from "../../../Contexts/APIContext";

const BACKEND_DOMAIN = "http://localhost:8000/"
const API_URL = BACKEND_DOMAIN + "accounts/"

const EditProfile = () => {
  const [message, setMessage] = useState("");
  const [avatarForm, setAvatarForm] = useState();
  let user_data = AuthService.getCurrentUser()
  const { setUsername, setAvatar } = useContext(APIContext)
  let navigate = useNavigate();

  const editProfile = (props) => {
    setMessage("");
    props.avatar = avatarForm
    let formData = new FormData()
    for (var key in props) {
      if (props[key])
        formData.append(key, props[key])
    }

    for (var key in props)
      delete props[key]
    return axios
      .patch(API_URL + "edit_profile/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: AuthService.authHeader()
        }
      })
      .then((response) => {
        if (response && response.data && response.data.errors)
          setMessage(response.data.errors.join("\n"));
        else if (response && response.data && response.data.username) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setUsername(response.data.username)
          if (response.data.avatar)
            setAvatar(response.data.avatar)
          navigate("/profile");
        }
      }).catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            (error.response.data.message ||
              error.response.data.username
            )) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      })
  }




  return (
    <>
      {!AuthService.isLoggedIn() && <Navigate to="/login" />}
      <Box alignSelf="center">

        <PageHeader title="Edit Profile" pad="medium"/>
        <Form
          onSubmit={editProfile}
          pad={{
            horizontal: 'small',
          }}
          direction="row"
          className="SignUpForm"
        >
          <Box direction="row" gap="xlarge"
            pad={{
              horizontal: 'medium',
            }}>

            <Box width="medium" gap="medium">
              <TextInputField
                label="Username"
                name="username"
                placeholder={user_data.username}
              />
              <PasswordInputField
                label="Old Password"
                name="old_password"

                validation={[
                  validators.minLength(8)
                ]}
              />
              <PasswordInputField
                label="New Password"
                name="password"

                validation={[
                  validators.minLength(8)
                ]}
              />
              <PasswordInputField
                label="Repeat New Password"
                name="password2"
                validation={[
                  validators.minLength(8)
                ]}
              />
              <TextInputField
                label="Email"
                name="email"
                placeholder={user_data.email ? user_data.email : ""}
                validation={[validators.email()]}
              />
            </Box>

            <Box width="medium" gap="medium">
              <TextInputField
                label="First Name"
                name="first_name"
                placeholder={user_data.first_name ? user_data.first_name : ""}
              />
              <TextInputField
                label="Last Name"
                name="last_name"
                placeholder={user_data.last_name ? user_data.last_name : ""}
              />
              <TextInputField
                label="Phone"
                name="phone"
                placeholder={user_data.phone ? user_data.phone : ""}
              />

              <FormField
                htmlFor="avatar"
                name="avatar"
                label="Change Avatar"
              >
                <FileInput
                  messages={{
                    dropPrompt: 'Drag and drop'
                  }}
                  onChange={(event, { files }) => setAvatarForm(files[0])}
                  id="avatar"
                  name="avatar"
                />
              </FormField>

              <Box direction="row" gap="medium" pad="small" alignSelf="end">
                <Button primary type="submit" label="Save" />
                <Button type="button" label="Cancel" onClick={() => navigate('/profile')} />
              </Box>
            </Box>
          </Box>
          {message !== "" && <Box className="ErrorMessage"> {message} </Box>}
        </Form>
      </Box>

    </>
  )
}

export default EditProfile;