import { createContext, useReducer } from 'react';

export const UserContext = createContext({
  user: {
    firstName: "",
    lastName: "",
    phone: "",
    fnValid: false,
    lnValid: false,
    phValid: false,
  },
  changeFirstName: (newFName) => {},
  changeLastName: (newLName) => {},
  changePhone: (phone) => {},
});

export function userReducer(state, action) {
  switch (action.type) {
    case 'FIRST_NAME':
      const fnIsValid = action.payload.trim().length > 0;
      return { ...state, firstName: action.payload, fnValid: fnIsValid  };
    case 'LAST_NAME':
      const lnIsValid = action.payload.trim().length > 0;
      return { ...state, lastName: action.payload, lnValid: lnIsValid  };
    case 'PHONE':
      const phIsValid = action.payload.trim().length === 12;
      return { ...state, phone: action.payload, phValid: phIsValid };
    default:
      return state;
  }
}

function UserContextProvider( {children} ) {
  // Create blank user object for reducer initialization
  const blankUser = {
    firstName: "",
    lastName: "",
    phone: "",
  };

  // Create states for context data
  const [userState, dispatch] = useReducer(userReducer, blankUser);

  // Functions to change state for each piece of data
  function changeFirstName(newFName) {
    dispatch({ type: 'FIRST_NAME', payload: newFName });
  }
  function changeLastName(newLName) {
    dispatch({ type: 'LAST_NAME', payload: newLName });
  }
  function changePhone(newPhone) {
    dispatch({ type: 'PHONE', payload: newPhone });
  }

  const value = {
    user: userState,
    changeFirstName: changeFirstName,
    changeLastName: changeLastName,
    changePhone: changePhone,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
