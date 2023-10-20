import React, { useReducer, createContext, useContext } from "react";

const MyContext = createContext({});

const initData = {
  count: 0,
};

const reducer = (state: any, action: any) => {
  switch (action?.type) {
    case "decrement":
      return { count: state?.count - 1 };
    case "increment":
      return { count: state?.count + 1 };
    default:
      return state;
  }
};

export const MyProvider = ({ children }: any) => {
  const [data, dispatch] = useReducer(reducer, initData);
  return (
    <MyContext.Provider value={{ data, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

export const UseMyContext = ()=>{
  return  useContext(MyContext)
}