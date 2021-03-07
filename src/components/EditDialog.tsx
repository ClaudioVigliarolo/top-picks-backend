import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "../constants/Colors";
import { TextField } from "@material-ui/core";
import { EditItem, Question, Report, Topic } from "../interfaces/Interfaces";
import { Label } from "@material-ui/icons";
import { updateQuestion } from "../api/api";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  open: boolean;
  title: string;
  question: string;
  id: number;
  onConfirm: any;
  onRefuse: any;
}
export default function AlertDialogSlide(props: AlertDialogSlideProps) {
  const [question, setQuestion] = React.useState<string>("");
  React.useEffect(() => {
    setQuestion(props.question);
  }, [props.question]);

  const onSubmit = async () => {
    if (question == "") {
      //set error
      return;
    }
    props.onConfirm(question);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>

        <DialogContent style={{ minWidth: 600 }}>
          <TextField
            autoFocus
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Question"
            id="standard-helperText"
            value={question}
            onChange={(e) => setQuestion(e.currentTarget.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.onRefuse}
            style={{ color: COLORS.darkerOrange }}
          >
            Revert
          </Button>
          <Button onClick={onSubmit} style={{ color: COLORS.blue }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
