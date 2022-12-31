import React, { createContext, useReducer } from "react";


export const InfoContext = createContext()
export const Context = (props) => {
    const reducer = (state, action, qty) => {
      switch (action.type) {
        case 'ADD':
          const tempState = state.filter((item)=>action.payload._id === item._id)
          if (tempState.length > 0) {
            return state;
          } else if(tempState.length === 0) {
            return [...state, {...action.payload, qty: 1}];
          }
          
          break;

        case 'INCREASE':
          const targeted = state.filter((item)=>action.payload._id === item._id)
          if (targeted.length > 0) {
            return state.map((item)=>item._id === action.payload._id ? {...item, qty: item.qty + 1} : item);
          } else if(targeted.length === 0) {
            return [...state, {...action.payload, qty: 1}];
          };
          
          break;

        case 'DECREASE':
          const temp = state.filter((item)=>action.payload._id === item._id)
          if (temp.length > 0) {
            if(temp.qty === 1){
              return state.filter(
                (item) => item._id !== action.payload._id
              );
            }
            return state.map((item)=>item._id === action.payload._id && item.qty > 0 ? {...item, qty: item.qty - 1} : item);
          } else if(temp.length === 0) {
            return [...state, {...action.payload, qty: 1}];
          };
          
          break;

          case "REMOVE":
            const tempstate3 = state.filter(
              (item) => item._id !== action.payload._id
            );
            return tempstate3;
        
        default:
          return state;
      }
    };
    const [state, dispatch] = useReducer(reducer, []);
    return (
      <InfoContext.Provider value={{state, dispatch}}>{props.children}</InfoContext.Provider>
    );
  };
