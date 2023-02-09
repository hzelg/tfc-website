import React from 'react';
import ClassesList from '../ClassesList';
import "./style.css";

const ClassesStudioSchedule = (props) => {
  const endPoint = "/classes/search_studio_schedule/" + props.studioId;

  return (
    <ClassesList endPoint={endPoint} needLogIn={false} class={props.class}/>
  );
};

export default ClassesStudioSchedule;