import React, { useState } from "react";
import { Form, TextInputField, PasswordInputField, EmailInputField, validators } from 'grommet-controls';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import AuthService from "../../../services/auth-service";
import { Button, Box, FileInput, FormField, PageHeader } from "grommet";
import './style.css';

const SignUpForm = () => {
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState();
  let navigate = useNavigate();

  const handleRegister = (e) => {
    setMessage("")
    e.avatar = avatar
    let formData = new FormData()
    for (var key in e) {

      if (e[key])
        formData.append(key, e[key])
    }
    console.log(formData)

    AuthService.register(formData).then(
      (response) => {
        if (response && response.data && response.data.errors)
          setMessage(response.data.errors.join("\n"));
        else if (response && response.data && response.data.username)
          navigate("/login");
      },
      (error) => {
        console.log("this?")
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  }

  return (
    <>
      {AuthService.isLoggedIn() && <Navigate to="/profile" />}
      <Box alignSelf="center">

        <PageHeader title="Sign Up" pad="medium" />
        <Form
          // validate="blur"
          onSubmit={handleRegister}
          pad={{
            horizontal: 'small',
          }}
          className="SignUpForm"
          direction="row"
          messages={{
            required: 'This is a required field.',
          }}
        >

          <Box direction="row" gap="large"
            pad={{
              horizontal: 'medium',
            }}>

            <Box width="medium" gap="medium">

              <TextInputField
                label="Username"
                name="username"
                validation={[validators.required()]}
              />
              <PasswordInputField
                label="Password"
                name="password"
                validation={[
                  validators.required(),
                  // validators.minLength(8)
                ]}
              />
              <PasswordInputField
                label="Repeat Password"
                name="password2"
                validation={[
                  validators.required(),
                  validators.minLength(8)
                ]}
              />
              <EmailInputField
                label="Email"
                name="email"
                validation={[validators.email()]}
              />
            </Box>

            <Box width="medium" gap="medium">
              <TextInputField
                label="First Name"
                name="first_name"
              />
              <TextInputField
                label="Last Name"
                name="last_name"
              />
              <TextInputField
                label="Phone"
                name="phone"
              />

              <FormField
                htmlFor="avatar"
                name="avatar"
                label="Avatar"
              >
                <FileInput
                  messages={{
                    dropPrompt: 'Drag and drop'
                  }}
                  id="avatar"
                  onChange={(event, { files }) => setAvatar(files[0])}
                  name="avatar"
                />
              </FormField>



            </Box>
          </Box>
          <Box>

            <Box pad="small" width="medium" justify="center" alignSelf="center">
              <Button type="submit" label="Sign Up"/>
              <Box  alignSelf="center" pad="small">
                
              <Link to={"/login"}>Already have an account?</Link>
              </Box>
            </Box>
          </Box>

          {message !== "" && <Box className="ErrorMessage"> {message} </Box>}
        </Form>
      </Box>
    </>
  )
}

export default SignUpForm;