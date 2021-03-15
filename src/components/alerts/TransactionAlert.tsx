import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../constants/Colors";
import CustomAlert from "./CustomAlert";

interface TransactionAlertProps {
  success: boolean;
  error: boolean;
}

export default function TransactionAlert(props: TransactionAlertProps) {
  return (
    <>
      <CustomAlert
        visible={props.success}
        text="Updated successfully!"
        type="success"
      />
      <CustomAlert
        visible={props.error}
        text="Error adding topic"
        type="error"
      />
    </>
  );
}
