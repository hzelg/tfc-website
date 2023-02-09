import React, { useContext } from "react";
import AuthService from "../../../../services/auth-service";
import { Button, } from "grommet";
import API from "../../../../api";
import APIContext from "../../../../Contexts/APIContext";


const EnrollButton = (props) => {
  const { setEnrolledCourses } = useContext(APIContext);

  const loginHeaders = {
    'Content-Type': 'multipart/form-data',
    Authorization: AuthService.authHeader()
  }

  const handleEnroll = () => {
    var payload = { class_obj: props.class, instance: props.instance }
    API.post("/classes/enroll_class/", payload, {headers: loginHeaders })
      .then(res => {
        if(res.data.success)
          updateEnrollemnts()
        else
          console.log("Enrollment didn't go through, request exception caught")
      }).catch(res => {
        console.log("Enrollment didn't go through, request exception caught")
      })
  };

  const updateEnrollemnts = () => {

    API.get("/classes/get_enrolled_classes/", {params:{}, headers: loginHeaders })
      .then(res => {
        if (res.status === 200){
          var enr = res.data.map((val) => val.instance)
          setEnrolledCourses(enr)
        }
        else
          setEnrolledCourses([])

      }).catch(res => {
        setEnrolledCourses([])
      })

  }

  return (
    <>
      <Button label="Enroll" reverse primary  onClick={handleEnroll}/>
    </>
  )
}

export default EnrollButton;