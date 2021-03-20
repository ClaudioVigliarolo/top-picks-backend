import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../buttons/CustomButton";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
      width: "60ch",
      padding: 50,
      backgroundColor: "white",
      borderRadius: 5,
    },
  },

  container: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    margin: 10,
  },
  button: {
    marginTop: 50,
    alignSelf: "center",
  },
}));

export default function BasicTextFields({
  username,
  onChangeUsername,
  onChangePassword,
  password,
  onSubmit,
  error,
  height,
  children,
}: {
  username: string;
  onChangeUsername: (newVal: string) => void;
  onChangePassword: (newVal: string) => void;
  password: string;
  onSubmit: () => void;
  error: boolean;
  height: string;
  children?: any;
}) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.container} style={{ height }}>
        <TextField
          onChange={(e) => onChangeUsername(e.currentTarget.value)}
          id="standard-basic"
          label="Username"
          className={classes.textField}
          value={username}
          error={error}
        />
        <TextField
          onChange={(e) => onChangePassword(e.currentTarget.value)}
          id="standard-basic"
          label="Password"
          type="password"
          value={password}
          className={classes.textField}
          error={error}
        />
        {children}
        <div className={classes.button}>
          <CustomButton onClick={onSubmit} title="Submit" />
        </div>
      </div>
    </form>
  );
}
