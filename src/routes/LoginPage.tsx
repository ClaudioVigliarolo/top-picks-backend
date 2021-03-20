import React from "react";
import { login } from "../api/api";
import TransactionAlert from "../components/alerts/TransactionAlert";
import Form from "../components/input/Form";
import { CONSTANTS } from "../constants/constants";
import { AuthContext } from "../context/AuthContext";
export default function LoginPage() {
  const {
    setIsAuthenticated,
    setUserType,
    setUsername,
    setUserLangs,
    setUserToken,
    userToken,
  } = React.useContext(AuthContext);

  //renamed  setUsername to setUsernameState for context function ovverriding problem
  const [usernameState, setUsernameState] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const onSubmit = async (): Promise<void> => {
    setError(false);
    if (!usernameState || !password) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const val = await login(usernameState, password);
    if (val) {
      alert("ok");
      console.log("myy", val);
      setIsAuthenticated(true);
      setUserType(val.type);
      setUsername(val.username);
      setUserToken(val.token);
      setUserLangs(val.languages);
      //get enabled languages for user
      //setUserLangs(val.langs);
    } else {
      setError(true);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Form
        onChangeUsername={(text: string) => setUsernameState(text)}
        onChangePassword={(text: string) => setPassword(text)}
        onSubmit={onSubmit}
        password={password}
        username={usernameState}
        height="40ch"
        error={error}
      />

      <TransactionAlert
        success={success}
        error={error}
        messageError="Authentication Failed"
      />
    </>
  );
}
