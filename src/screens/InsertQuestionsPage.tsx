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
import { useParams } from "react-router";
import { addQuestions, getTopics } from "../api/api";
import Alert from "@material-ui/lab/Alert";
import { Category, Topic } from "../interfaces/Interfaces";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
const MIN_QUESTIONS = 2;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 400,
      alignItems: "center",
      alignSelf: "center",
    },
    root: {
      width: "100%",
      height: 450,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
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

const NO_TOPIC = "Select A Topic";

export default function InsertTopicsPage() {
  const [error, setError] = React.useState(false);
  const [isReview, setReview] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [topic, setTopic] = React.useState<string>(NO_TOPIC);
  const [questions, setQuestions] = React.useState<string>("");
  const [questionsArray, setQuestionsArray] = React.useState<string[]>([]);

  const [topics, setTopics] = React.useState<Topic[]>([]);

  const { lang }: { lang: string } = useParams();

  React.useEffect(() => {
    (async () => {
      const retrievedTopics = await getTopics(lang);
      if (retrievedTopics && Array.isArray(retrievedTopics)) {
        setTopics(retrievedTopics);
      }
    })();
  }, []);

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    return (
      <ListItem button style={style} key={index}>
        <ListItemText secondary={questionsArray[index]} primary={index + 1} />
      </ListItem>
    );
  }

  const onSubmitReview = (): void => {
    const questionsArray = questions.match(/[^\r\n]+/g);
    if (questionsArray && questionsArray.length > MIN_QUESTIONS) {
      setReview(true);
      setQuestionsArray(questionsArray as string[]);
    }
  };

  const onSubmit = async (): Promise<void> => {
    if (questionsArray && questionsArray.length > MIN_QUESTIONS) {
      const val = await addQuestions(questionsArray, topic, lang);
      if (val) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setQuestions("");
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
      setReview(false);
    }
  };

  const handleTopicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTopic(event.target.value as string);
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
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Add Questions<span style={{ color: "orange" }}> : {lang}</span>
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
          {!isReview && (
            <Select
              style={{
                marginTop: 50,
                fontSize: 20,
                textTransform: "capitalize",
                width: 220,
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={topic}
              onChange={handleTopicChange}
            >
              <MenuItem value={NO_TOPIC}>{NO_TOPIC}</MenuItem>
              {topics.map((lan: Topic) => (
                <MenuItem value={lan.title}>{lan.title}</MenuItem>
              ))}
            </Select>
          )}
          {isReview && <h1 style={{ textAlign: "center" }}>{topic}</h1>}
        </div>
        <div
          style={{
            marginTop: 100,
            flexDirection: "row",
            display: isReview ? "none" : "flex",
          }}
        >
          <div>
            <textarea
              value={questions}
              onChange={(e) => setQuestions(e.currentTarget.value)}
              placeholder="Paste the Questions here  &#10;Keep In Mind: Every Question should be in his own line!"
            />
          </div>
        </div>
        <div>
          <div
            style={{
              marginTop: 20,
              display:
                !isReview &&
                topic != NO_TOPIC &&
                questions.match(/[^\r\n]+/g) != null &&
                questions.match(/[^\r\n]+/g)!.length > MIN_QUESTIONS
                  ? "flex"
                  : "none",
              margin: 20,
            }}
          >
            <CustomButton onClick={onSubmitReview} title="Submit For Review" />
          </div>
        </div>
        <div
          className={classes.root}
          style={{
            marginTop: 50,
            flexDirection: "column",
            display: !isReview ? "none" : "flex",
            alignItems: "center",
          }}
        >
          <FixedSizeList
            height={1000}
            width={1000}
            itemSize={70}
            itemCount={questionsArray.length}
          >
            {renderRow}
          </FixedSizeList>
        </div>
        <div
          style={{
            display: isReview ? "flex" : "none",
            flexDirection: "row",
            marginTop: 100,
          }}
        >
          <div style={{ margin: 20 }}>
            <CustomButton
              onClick={() => setReview(false)}
              color={COLORS.red}
              title="Revert"
            />
          </div>

          <div style={{ margin: 20 }}>
            <CustomButton onClick={onSubmit} title="Submit" />
          </div>
        </div>
      </div>

      <CustomAlert
        visible={success}
        text="Inserted Successfully!"
        type="success"
      />
      <CustomAlert
        visible={error}
        text="Error Uploading, Please triple check your Questions"
        type="error"
      />
    </div>
  );
}
