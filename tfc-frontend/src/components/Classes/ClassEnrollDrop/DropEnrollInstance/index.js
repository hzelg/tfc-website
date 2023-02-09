import React, { useContext, useEffect, useState } from "react";
import APIContext from "../../../../Contexts/APIContext";
import EnrollButton from "../ClassEnrollButton";
import DropButton from "../ClassDropButton";


const ClassDropEnrollInstance = (props) => {
  const { enrolledCourses, page, filter, curSubscription } = useContext(APIContext);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    setEnrolled(enrolledCourses.includes(props.instance))
  }, [enrolledCourses, page, filter, props.instance])

  return (
    <>
      {!curSubscription ? <></> :
        <>
          {!enrolled ?
            <EnrollButton class={props.class} instance={props.instance} />
            :
            <DropButton class={props.class} instance={props.instance} />
          }
        </>
      }
    </>
  )
}

export default ClassDropEnrollInstance;