import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { COLORS } from "../constants/Colors";
import { useParams } from "react-router";
import { addCategory } from "../api/api";
import Alert from "@material-ui/lab/Alert";
import { Category } from "../interfaces/Interfaces";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";

export default function InsertCategoriesPage() {
  const [error, setError] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [category, setCategory] = React.useState<string>("");
  const { lang }: { lang: string } = useParams();

  React.useEffect(() => {
    (async () => {})();
  }, []);

  const onSubmit = async (): Promise<void> => {
    setError(false);
    if (!category) {
      setError(true);
      return;
    }
    const val = await addCategory(category, lang);
    if (val) {
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    } else {
      setError(true);
    }
    setCategory("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Add a Category<span style={{ color: "orange" }}> : {lang}</span>
        </h1>
        <form autoComplete="off">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: 500,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div>
              <TextField
                id="outlined-basic"
                label="Insert Category"
                value={category}
                variant="outlined"
                onChange={(e) => setCategory(e.currentTarget.value)}
                error={error}
                style={{ borderColor: "orange" }}
              />
            </div>
            <CustomButton onClick={onSubmit} title="Submit" />
          </div>
        </form>
      </div>
      <CustomAlert visible={alert} text="Success!" type="success" />
    </div>
  );
}
