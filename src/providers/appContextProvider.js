import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const Context = createContext({});

const AppContextProvider = ({ children }) => {
  const [dueDate, setDueDate] = useState();
  const [filter, setFilter] = useState('A');

  const updateDueDate = (dateVal) => {
    setDueDate(dateVal);
  };

  //Set current date initially
  useEffect(() => {
    let today = new Date();
    if (dueDate === undefined) {
      updateDueDate(today);
    }
  }, []);

    //Set current date initially
    useEffect(() => {
      setFilter('A')
    }, []);

  const value = {
    dueDate,
    updateDueDate,
    filter,
    setFilter,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { AppContextProvider, useAppContext};
