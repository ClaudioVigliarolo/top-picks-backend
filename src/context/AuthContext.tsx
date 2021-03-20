import React from "react";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (newVal: boolean) => {},
  setUserType: (newVal: string) => {},
  userType: "",
  setUsername: (newVal: string) => {},
  setUserLangs: (newVals: string[]) => {},
  setUserToken: (newVal: string) => {},
  userToken: "",
  langs: [],
  username: "",
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [userType, setUserType] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [userToken, setUserToken] = React.useState<string>("");

  const [userLangs, setUserLangs] = React.useState<string[]>([]);

  const onSetIsAuthenticated = (newVal: boolean) => {
    setIsAuthenticated(newVal);
  };

  const onSetUserType = (newVal: string) => {
    setUserType(newVal);
  };

  const onSetUserName = (newVal: string) => {
    setUsername(newVal);
  };

  const onSetUserLangs = (newVals: string[]) => {
    setUserLangs(newVals);
  };
  const onSetUserToken = (newVal: string) => {
    setUserToken(newVal);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated: onSetIsAuthenticated,
        setUserType: onSetUserType,
        userType,
        setUsername: onSetUserName,
        setUserLangs: onSetUserLangs,
        setUserToken: onSetUserToken,
        userToken,
        langs: [],
        username: "",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
