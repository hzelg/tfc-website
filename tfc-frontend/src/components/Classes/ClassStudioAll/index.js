import React from 'react';
import ClassesList from '../ClassesList';

const ClassesStudioAll = (props) => {
  const endPoint = "/classes/get_all_studio_classes/" + props.studioId;

  return (
    <ClassesList endPoint={endPoint} needLogIn={false} class_only={true}/>
  );
};

export default ClassesStudioAll;