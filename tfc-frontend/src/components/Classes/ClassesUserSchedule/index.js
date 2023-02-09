import React from 'react';
import ClassesList from '../ClassesList';

const ClassesUserSchedule = () => {
  const endPoint = "/classes/user_class_schedule/";

  return (
    <ClassesList endPoint={endPoint} needLogIn={true}/>
  );
};

export default ClassesUserSchedule;