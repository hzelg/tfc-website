import React, { useContext } from "react";
import EnrollButton from "../ClassEnrollButton";
import DropButton from "../ClassDropButton";
import APIContext from "../../../../Contexts/APIContext";


const ClassDropEnrollClass = (props) => {
  const { curSubscription } = useContext(APIContext);

  return (
    <>
      {!curSubscription ? <></> :
        <>
          <EnrollButton class={props.class} />
          <DropButton class={props.class} />
        </>
      }
    </>
  )
}

export default ClassDropEnrollClass;