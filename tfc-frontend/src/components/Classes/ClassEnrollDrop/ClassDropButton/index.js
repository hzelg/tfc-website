import React, { useContext } from "react";
import AuthService from "../../../../services/auth-service";
import { Button, } from "grommet";
import API from "../../../../api";
import APIContext from "../../../../Contexts/APIContext";


const DropButton = (props) => {
  const { enrolledCourses, setEnrolledCourses } = useContext(APIContext);

  const loginHeaders = {
    'Content-Type': 'multipart/form-data',
    Authorization: AuthService.authHeader()
  }

  const handleDrop = () => {
    var payload = { class_obj: props.class, instance: props.instance }
    console.log(payload)
    console.log(enrolledCourses)
    return API.delete("/classes/drop_class/", { data: payload, headers: loginHeaders })
      .then(res => {
        if (res.status = 204)
          updateEnrollemnts()
        else
          console.log("Drop course didn't go through, request exception caught")
      }).catch(res => {
        console.log("Drop course didn't go through, request exception caught")
      })
  };

  const updateEnrollemnts = () => {

    return API.get("/classes/get_enrolled_classes/", { headers: loginHeaders })
      .then(res => {
        if (res.status === 200) {
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
    <Button label="Drop" reverse secondary onClick={handleDrop} />
  )
}

export default DropButton;