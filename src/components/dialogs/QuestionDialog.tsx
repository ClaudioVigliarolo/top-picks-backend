import React from "react";
import { CustomDialog } from "./DialogStyles";
import Select from "../filters/Select";
interface QuestionDialogProps {
  topic: string;
  open: boolean;
  onConfirm: (question: string, topic: string) => void;
  onRefuse: () => void;
  topics: string[];
  question: string;
  headerText: string;
}
const NO_TOPIC = "Select a topic";

export default function QuestionDialog(props: QuestionDialogProps) {
  const [question, setQuestion] = React.useState<string>("");
  const [topic, setTopic] = React.useState<string>("");
  const [topics, setTopics] = React.useState<string[]>([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setQuestion(props.question);
    setTopic(props.topic);
    setTopics(props.topics);
  }, [props.topics, props.topic, props.question]);

  const onSubmit = async (newTopic: string, newQuestion: string) => {
    setError(false);
    if (newTopic == "" || newQuestion == "") {
      setError(true);
      return;
    }
    props.onConfirm(newQuestion, newTopic);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTopic(event.target.value as string);
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={500}
        children={
          <div style={{ alignSelf: "center" }}>
            <Select
              handleChange={handleChange}
              value={topic}
              values={topics}
              color="black"
              defaultValue={NO_TOPIC}
            />
          </div>
        }
        onConfirm={() => {
          onSubmit(topic, question);
        }}
        onRefuse={props.onRefuse}
        error={error}
        onChange={(text) => setQuestion(text)}
        text={question}
      />
    </>
  );
}
