import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import { COLORS } from "../constants/Colors";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { useParams } from "react-router";
import { addCategory, addTopic, getCategories } from "../api/api";
import Alert from "@material-ui/lab/Alert";
import { Category, Topic } from "../interfaces/Interfaces";
import Chip from "@material-ui/core/Chip";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
const NO_CATEGORY = "Select A Category";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
      alignItems: "center",
      alignSelf: "center",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "center",
      alignItems: "center",
    },
    chip: {
      margin: 2,
      backgroundColor: "orange",
      color: "white",
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

export default function InsertTopicsPage() {
  const [error, setError] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [topic, setTopic] = React.useState<string>("");
  const { lang }: { lang: string } = useParams();

  React.useEffect(() => {
    (async () => {
      const retrievedCategories = await getCategories(lang);
      if (retrievedCategories && Array.isArray(retrievedCategories)) {
        const categories: string[] = retrievedCategories.map(
          (categ: Category) => categ.title
        );
        setCategories(categories);
      }
    })();
  }, []);

  const onSubmit = async (): Promise<void> => {
    setError(false);
    if (!topic || selectedCategories.length == 0) {
      setError(true);
      return;
    }
    const val = await addTopic(selectedCategories, topic, lang);
    if (val) {
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    } else {
      setError(true);
    }

    setTopic("");
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategories(event.target.value as string[]);
  };

  {
    console.log(selectedCategories);
  }

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
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Add a Topic<span style={{ color: "orange" }}> : {lang}</span>
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: 500,
            marginTop: 100,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Insert Topic"
              value={topic}
              variant="outlined"
              onChange={(e) => setTopic(e.currentTarget.value)}
              error={error}
              style={{ borderColor: "orange" }}
            />
          </div>
          <div>
            <CustomButton onClick={onSubmit} title="Submit" />
          </div>
        </div>
        <div
          style={{
            width: 200,
            height: 100,
            marginBottom: 100,
            marginTop: 20,
          }}
        >
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Categories</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              error={error}
              multiple
              style={{ width: 200 }}
              value={selectedCategories}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((categ: string) => (
                <MenuItem
                  key={categ}
                  value={categ}
                  style={getStyles(categ, categories, theme)}
                >
                  {categ}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <CustomAlert visible={alert} text="Success!" type="success" />
    </div>
  );
}
