import React, { useContext, useEffect } from 'react';
import { Box, Text, Pagination } from 'grommet';
import "./style.css"
import API from '../../../api';
import ClassListElement from '../ClassesListElement';
import ClassesContext from '../ClassesContext';
import AuthService from '../../../services/auth-service';
import { Navigate } from 'react-router-dom';
import APIContext from '../../../Contexts/APIContext';

const ClassesList = (props) => {
  const { count, pageSize, classes, filter, setClasses, page,
    setCount, setPage } = useContext(ClassesContext);
  const { setEnrolledCourses, curSubscription, setCurSubscription } = useContext(APIContext);

  // Whenever the filter changes, load the data of the first page
  useEffect(() => {
    setPage(1)
    getData(1)
  }, [filter])

  const handleChange = ({ page }) => {
    setPage(page)
    getData(page)
  };

  const loginHeaders = {
    'Content-Type': 'multipart/form-data',
    Authorization: AuthService.authHeader()
  }

  useEffect(() => {
    API.get("/classes/get_enrolled_classes/", { params: {}, headers: loginHeaders })
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


    API.get("/subscriptions/api/my_subscription/", { headers: loginHeaders })
      .then(response => {
        console.log(response)
        console.log("fuck this shit")
        if (response.data.code != "101")
          setCurSubscription(response.data.plan_title)
        else
          setCurSubscription(null)
      }).catch(res => {
        setCurSubscription(null)
      })
  }, [filter, page])




  const getData = (page) => {
    var data = filter
    data.page = page
    data.class_obj__id = props.class
    var loginHeaders = {
      'Content-Type': 'multipart/form-data',
      Authorization: AuthService.authHeader()
    }
    var headers = props.needLogIn ? loginHeaders : {}
    console.log(headers)
    API.get(props.endPoint, { params: data, headers: headers })
      .then(res => {
        if (res.status === 200) {
          setClasses(res.data.results)
          setCount(res.data.count)
        } else {
          setClasses([])
          setCount(0)
        }
      }).catch(res => {
        setClasses([])
        setCount(0)
      })
  }


  return (
    <>
      {(props.needLogIn & !AuthService.isLoggedIn()) ? <Navigate to="/login" /> :
        <div className="ClassList">
          {!count ?
            <Box pad="large" gap="medium" height={{ min: 'medium' }} >
              <Text size="large"> No classes found </Text>
            </Box>
            :
            <Box pad="large" gap="medium">
              <Box height={{ min: 'medium' }} gap="small" >
                {console.log(classes)}
                {classes.map((cla) => (
                  <ClassListElement classData={cla} class_only={props.class_only} />
                ))}
              </Box>
              <Box align="right" direction="row" justify="center">
                <Pagination step={pageSize} page={page} numberItems={count} onChange={handleChange} />
              </Box>

            </Box>
          }
        </div>
      }
    </>
  );
};

export default ClassesList;