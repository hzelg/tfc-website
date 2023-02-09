import React from 'react';
import { Box, Button, Card, Image, Tag, Text } from 'grommet';
import { FormNext } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import "./style.css"
import ClassDropEnrollInstance from '../ClassEnrollDrop/DropEnrollInstance';

function ClassListElement(props) {
  console.log(props.data)
  const navigation = useNavigate()
  const class_obj = props.classData.class_obj ? props.classData.class_obj : props.classData
  const instance_obj = props.classData.instance ? props.classData.instance : props.classData
  return (
    // If its an element for only a class, you want to go and see details about the class
    <>
      {props.class_only ?
        (<>
          <Card width="1100px" pad="medium" gap="large" round="medium" flex="fixed">
            <Box direction="row" gap="large" justify="between" align="center">
              <Box direction="row" gap="medium">
                <Box width={"medium"} justify="center" align="center" flex="flex">
                  <Text size="large" color="text-strong" weight="bold" skeleton={{ width: 'small' }} alignSelf="start">
                    {class_obj.name}
                  </Text>
                </Box>
                <Box width={"medium"} >
                  <Text size="small">Coach: {class_obj.coach}</Text>
                  <Text size="small">Capacity: {class_obj.capacity}</Text>
                </Box>
              </Box>

              {class_obj.cancelled ?
                <Tag value="Cancelled" style={{ color: "red" }} /> 
                :
                <Button label="View Details" reverse icon={<FormNext />} secondary onClick={() => {
                  console.log(class_obj);
                  navigation('/class_details', { state: { class: class_obj } });
                }} />
              }
            </Box>
          </Card>
        </>)
        :
        // If its a class instance element, allow enroll/drop button
        <>
          <Card width="1100px" pad="medium" gap="large" round="medium" flex="fixed">
            <Box direction="row" gap="large" justify="between" align="center">
              <Box direction="row" gap="medium">
                <Box width={"medium"} justify="center" align="center" flex="flex">
                  <Text size="large" color="text-strong" weight="bold" skeleton={{ width: 'small' }}>
                    {class_obj.name}
                  </Text>
                </Box>
                <Box width={"medium"} >
                  <Text size="small">Coach: {class_obj.coach}</Text>
                  <Text size="small">Capacity: {class_obj.capacity}</Text>
                  <Text size="small">Spots Available: {instance_obj.free_spots}</Text>
                </Box>
                <Box width={"medium"}>

                  <Text size="small">Date: {instance_obj.class_date}</Text>
                  <Text size="small">From: {instance_obj.class_start}</Text>
                  <Text size="small">To: {instance_obj.class_end} </Text>
                </Box>
              </Box>

              {class_obj.cancelled ?
                <Tag value="Cancelled" style={{ color: "red" }} /> 
                :
                <ClassDropEnrollInstance class={class_obj.id} instance={instance_obj.id} />
              }
            </Box>
          </Card>
        </>
      }
    </>
  )
};

export default ClassListElement;