import React from "react";
import { CustomDialog } from "./DialogStyles";

interface CategoryDialogProps {
  open: boolean;
  onConfirm: any;
  onRefuse: any;
  category: string;
  headerText: string;
}
export default function CategoryDialog(props: CategoryDialogProps) {
  const [category, setCategory] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  const onSubmit = async (newCategory: string) => {
    setError(false);
    setCategory("");
    if (newCategory == "") {
      setError(true);
      return;
    }
    props.onConfirm(newCategory);
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={400}
        onConfirm={() => onSubmit(category)}
        onRefuse={props.onRefuse}
        error={error}
        onChange={(text) => setCategory(text)}
        text={category}
      />
    </>
  );
}
