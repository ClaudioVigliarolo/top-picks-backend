import React from "react";
import Button from "@material-ui/core/Button";
import { COLORS } from "../constants/Colors";
import { Language, languages } from "../constants/languages";
import { useHistory } from "react-router-dom";
import { MenuItem, Select } from "@material-ui/core";
import CustomButton from "../components/CustomButton";

const NO_LANG = "Select A Language";
export default function StartPage() {
  const [language, setLanguage] = React.useState<string>(NO_LANG);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        alignSelf: "center",
        minHeight: "100vh",
        backgroundColor: COLORS.lighterOrange,
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginTop: 100,
        }}
      >
        {language == NO_LANG ? "Select Language" : "What Do You Want To Do?"}
      </h1>
      <Select
        style={{
          marginTop: 50,
          color: "white",
          fontSize: 20,
          textTransform: "capitalize",
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={language}
        onChange={handleChange}
      >
        <MenuItem value={NO_LANG}>{NO_LANG}</MenuItem>
        {languages.map((lan: Language, index) => (
          <MenuItem key={index} value={lan.value}>
            {lan.title}
          </MenuItem>
        ))}
      </Select>

      <div
        style={{
          display: language != NO_LANG ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <div style={{ marginTop: 30 }}>
          <CustomButton
            onClick={() => history.push("/insert/categories/" + language)}
            title="INSERT NEW CATEGORIES"
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <CustomButton
            onClick={() => history.push("/insert/topics/" + language)}
            title="INSERT NEW TOPICS"
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <CustomButton
            onClick={() => history.push("/insert/questions/" + language)}
            title="INSERT NEW QUESTIONS"
          />
        </div>
      </div>
    </div>
  );
}
