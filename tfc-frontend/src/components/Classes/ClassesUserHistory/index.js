import React from 'react';
import ClassesList from '../ClassesList';

const ClassesUserHistory = () => {
  const endPoint = "/classes/user_class_history/";

  return (
    <ClassesList endPoint={endPoint} needLogIn={true}/>
  );
};

export default ClassesUserHistory;