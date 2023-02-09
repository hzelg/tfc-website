import { createContext, useState } from "react";
import API from "../../api";

export const useStudioContext = () => {
  const [studios, setStudios] = useState([]);
  const [count, setCount] = useState(1);
  const [filter, setFilter] = useState({});
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [latitude, setLatitude] =   useState(43.66511259965255)
  const [longitude, setLongitude] = useState(-79.39474806189537)
  
  return {
    studios, setStudios, 
    count, setCount, 
    pageSize, setPageSize,
    page, setPage,
    filter, setFilter,
    latitude, setLatitude,
    longitude, setLongitude
  }
}

const StudioContext = createContext({
  studios: null, setStudios: () => { },
  count: null, setCount: () => { },
  pageSize: null, setPageSize: () => { },
  page: null, setPage: () => { },
  filter: null, setFilter: () => { },
  latitude: null, setLatitude: () => { },
  longitude: null, setLongitude: () => { },
})

export default StudioContext;