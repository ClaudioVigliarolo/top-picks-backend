import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "../../constants/Colors";
import { TextField } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CategoryDialogProps {
  open: boolean;
  onConfirm: any;
  onRefuse: any;
}
export default function CategoryDialog(props: CategoryDialogProps) {
  const [category, setcategory] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  const onSubmit = async () => {
    if (category == "") {
      setError(true);
      return;
    }
    props.onConfirm(category);
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
        <DialogTitle id="alert-dialog-slide-title">
          Add New Category
        </DialogTitle>

        <DialogContent style={{ minWidth: 400 }}>
          <TextField
            error={error}
            autoFocus
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="category"
            id="standard-helperText"
            value={category}
            onChange={(e) => setcategory(e.currentTarget.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.onRefuse}
            style={{ color: COLORS.darkerOrange }}
          >
            Close
          </Button>
          <Button onClick={onSubmit} style={{ color: COLORS.blue }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
