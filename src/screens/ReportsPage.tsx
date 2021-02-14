import React from "react";
import Button from "@material-ui/core/Button";
import { COLORS } from "../constants/Colors";
export default function ReportsPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        alignSelf: "center",
        minHeight: "100vh",
        backgroundColor: COLORS.lighterOrange,
      }}
    >
      <h1>Report Page</h1>
    </div>
  );
}
