import React from "react";
import { login } from "../api/api";
import TransactionAlert from "../components/alerts/TransactionAlert";
import Form from "../components/input/Form";
import { CONSTANTS } from "../constants/constants";
export default function LoginPage() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const onSubmit = async (): Promise<void> => {
    setError(false);
    if (!username || !password) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const val = await login(username, password);
    if (val) {
      alert("ok");
    } else {
      setError(true);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <Form
        onChangeUsername={(text: string) => setUsername(text)}
        onChangePassword={(text: string) => setPassword(text)}
        onSubmit={onSubmit}
        password={password}
        username={username}
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
