import React from "react";
import { CustomDialog } from "./DialogStyles";
import Chip from "../filters/Chip";
interface TopicDialogProps {
  topic: string;
  open: boolean;
  onConfirm: (topicTitle: string, selectedCategoriesTitle: string[]) => void;
  onRefuse: () => void;
  categories: string[];
  preselectedCategories: string[];
  headerText: string;
}

export default function TopicDialog(props: TopicDialogProps) {
  const [topic, setTopic] = React.useState<string>("");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTopic(props.topic);
    setCategories(props.categories);
    setSelectedCategories(props.preselectedCategories);
  }, [props.categories, props.topic, props.preselectedCategories]);

  const onSubmit = async (newTopic: string, selectedCategories: string[]) => {
    setError(false);
    if (newTopic == "" || selectedCategories.length == 0) {
      setError(true);
      return;
    }
    props.onConfirm(newTopic, selectedCategories);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategories(event.target.value as string[]);
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={600}
        children={
          <Chip
            width={500}
            selectedValues={selectedCategories}
            values={categories}
            defaultValue="selll"
            error={error}
            handleChange={handleChange}
          />
        }
        onConfirm={() => {
          onSubmit(topic, selectedCategories);
        }}
        onRefuse={props.onRefuse}
        error={error}
        onChange={(text) => setTopic(text)}
        text={topic}
      />
    </>
  );
}
