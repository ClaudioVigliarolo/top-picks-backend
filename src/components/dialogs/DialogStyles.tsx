import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "../../constants/colors";
import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TextDialogProps {
  open: boolean;
  onConfirm: any;
  confirmButtonText?: string;
  onRefuse: any;
  refuseButtonText?: string;
  text: string;
  headerText: string;
  children?: any;
  error: boolean;
  onChange: (text: string) => void;
  minWidth: number;
}
export const CustomDialog = (props: TextDialogProps) => {
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
          {props.headerText}
        </DialogTitle>

        <DialogContent style={{ minWidth: props.minWidth }}>
          <TextField
            error={props.error}
            autoFocus
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="text"
            id="standard-helperText"
            value={props.text}
            onChange={(e) => props.onChange(e.currentTarget.value)}
            fullWidth
          />
        </DialogContent>
        {props.children}
        <DialogActions>
          <Button
            onClick={props.onRefuse}
            style={{ color: COLORS.darkerOrange }}
          >
            {props.refuseButtonText ? props.refuseButtonText : "Close"}
          </Button>
          <Button onClick={props.onConfirm} style={{ color: COLORS.blue }}>
            {props.confirmButtonText ? props.confirmButtonText : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
