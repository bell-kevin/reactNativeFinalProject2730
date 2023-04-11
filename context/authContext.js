import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  dataProvided: false,
  authenticate: (token) => {},
  setProvidedData: (bool) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [dataIsProvided, setDataIsProvided] = useState();

  function authenticate(token) {
    setAuthToken(token);
  }

  function setProvidedData(bool) {
    setDataIsProvided(bool);
  }

  function logout() {
    setAuthToken(null);
    setDataIsProvided(false);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    dataProvided: dataIsProvided,
    authenticate: authenticate,
    setProvidedData: setProvidedData,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
