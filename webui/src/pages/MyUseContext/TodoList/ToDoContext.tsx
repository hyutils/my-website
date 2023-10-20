import React, { useReducer, useContext, createContext } from "react";

/** 初始化 */
const initList = {
  list: [],
};

const reducer =(state:any, action:any)=> {
  switch(action.type){
    case 'add':
      return [...state, action?.data];
    case 'delete':
      return state?.filter((item:any)=> item?.id !== action?.id);
    case 'edit':
      return state.map((item:any)=> item?.id === action?.id ? {...item, done: action?.done}: item);
    case 'view':
      return state.find((item:any)=> item?.id === action?.id);
    default:
      return state
  }
}

const TodoContext = createContext({}as any);

export const TodoProvider = ({ children }: any) => {
  const [data, dispatch] = useReducer(reducer, initList)
  return <TodoContext.Provider value={{data, dispatch}}>{children}</TodoContext.Provider>
};

export const UseTodoContext = ()=>{
  return useContext(TodoContext)
}