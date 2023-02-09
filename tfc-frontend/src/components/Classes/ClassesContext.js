import { createContext, useState } from "react";

export const useClassesContext = () => {
  const [classes, setClasses] = useState([]);
  const [count, setCount] = useState(1);
  const [filter, setFilter] = useState({});
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  return {
    classes, setClasses, 
    count, setCount, 
    pageSize, setPageSize,
    page, setPage,
    filter, setFilter
  }
}

const ClassesContext = createContext({
  classes: null, setClasses: () => { },
  count: null, setCount: () => { },
  pageSize: null, setPageSize: () => { },
  page: null, setPage: () => { },
  filter: null, setFilter: () => { },
})

export default ClassesContext;