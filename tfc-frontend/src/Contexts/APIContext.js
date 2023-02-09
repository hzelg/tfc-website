import { createContext, useState } from "react";
import AuthService from "../services/auth-service";

export const useAPIContext = () => {
  const user_data = AuthService.getCurrentUser()


  const [loggedIn, setLoggedIn] = useState(AuthService.isLoggedIn());
  const [username, setUsername] = useState(user_data ? user_data.username : "");
  const [avatar, setAvatar] = useState(user_data ? user_data.avatar : "");
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [curSubscription, setCurSubscription] = useState(null);


  return {
    loggedIn, setLoggedIn,
    username, setUsername,
    avatar, setAvatar,
    enrolledCourses, setEnrolledCourses,
    curSubscription, setCurSubscription
  }
}

const APIContext = createContext({
  loggedIn: null, setLoggedIn: () => { },
  username: null, setUsername: () => { },
  avatar: null, setAvatar: () => { },
  enrolledCourses: null, setEnrolledCourses: () => { },
  curSubscription: null, setCurSubscription: () => { }
})

export default APIContext;