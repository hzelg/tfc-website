import React, { useCallback, useState, useContext, useEffect } from 'react';
import { Box, Text, Pagination } from 'grommet';
import StudioContext from '../StudioContext';
import StudioListElement from '../StudioListElement';
import "./style.css"
import API from '../../../api';

const StudioList = () => {
  const [loading, setLoading] = useState(true);
  const { count, pageSize, studios, filter, setStudios, page,
    setCount, setPage } = useContext(StudioContext);

  // Whenever the filter changes, load the data of the first page
  useEffect(() => {
    console.log(filter)
    console.log("nothing")
    setPage(1)
    getData(1)
  }, [filter])

  const handleChange = ({ page }) => {
    setPage(page)
    getData(page)
  };

  const getData = (page) => {
    var URL = "/studios/search_studios/";
    var data = {...filter}
    data.page = page
    API.get(URL, { params: data })
      .then(res => {
        if (res.status === 200) {
          setStudios(res.data.results)
          setCount(res.data.count)
        } else {
          setStudios([])
          setCount(0)
        }
      }).catch(res => {
        setStudios([])
        setCount(0)
      })
  }

  return (
    <div className="StudioList">

      {!count ?
        <Box pad="large" gap="medium">
          <Text size="large"> No studios found </Text>
        </Box>
        :
        <Box pad="large" gap="medium" height={{ min: 'medium' }} >
          <Box height={{ min: 'medium' }} gap="small" >
            {studios.map((studio) => (
              <StudioListElement data={studio} />
            ))}
          </Box>
          <Box align="right" direction="row" justify="center">
            <Pagination step={pageSize} page={page} numberItems={count} onChange={handleChange} />
          </Box>
        </Box>
      }

    </div>
  );
};

export default StudioList;