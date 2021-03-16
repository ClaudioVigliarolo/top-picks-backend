import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../constants/Colors";
import CustomAlert from "./CustomAlert";

interface TransactionAlertProps {
  success: boolean;
  error: boolean;
  messageSuccess?: string;
  messageError?: string;
}

export default function TransactionAlert({
  success,
  error,
  messageSuccess = "We encountered an error",
  messageError = "Successfully executed",
}: TransactionAlertProps) {
  return (
    <>
      <CustomAlert visible={success} text={messageSuccess} type="success" />

      <CustomAlert visible={error} text={messageError} type="error" />
    </>
  );
}
