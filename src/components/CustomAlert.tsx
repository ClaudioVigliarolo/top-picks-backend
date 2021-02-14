import { Alert, Color } from "@material-ui/lab";
import React from "react";

export default function CustomAlert({
  visible,
  type,
  text,
}: {
  visible: boolean;
  type: Color;
  text: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        display: visible ? "flex" : "none",
        bottom: "2%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Alert severity={type} variant="filled">
        {text}
      </Alert>
    </div>
  );
}
