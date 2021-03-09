import React from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FormControlLabel, MenuItem, Radio, Select } from "@material-ui/core";
import {
  EditItem,
  Question,
  Category,
  Topic,
} from "../../interfaces/Interfaces";
import { useParams } from "react-router-dom";
import {
  addCategory,
  getTopics,
  removeQuestion,
  updateQuestion,
} from "../../api/api";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import DeleteDialog from "../dialogs/CustomDialog";
import EditDialog from "../dialogs/EditDialog";
import CustomAlert from "../CustomAlert";
import { Alert } from "@material-ui/lab";
import { COLORS } from "../../constants/Colors";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import TopicAddDialog from "../dialogs/TopicAddDialog";
import CustomButton from "../CustomButton";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "orange",
      width: "100%",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
    },
  })
)(TableCell);

const StyledEditCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "orange",
      width: "100%",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      color: "black",
      position: "relative",
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: "85%",
      alignSelf: "center",
      backgroundColor: "white",
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 300,
      backgroundColor: "white",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface TableTopicsProps {
  topics: Topic[];
}

export default function TableTopics(props: TableTopicsProps) {
  const [searchText, setSearchText] = React.useState<string>("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [currentTopicId, setCurrentTopicId] = React.useState<number>(-1);
  const [
    currentTopicQuestion,
    setCurrentTopicQuestion,
  ] = React.useState<string>("");

  React.useEffect(() => {
    console.log("my topics", props.topics);
    setTopics(props.topics);
  }, [props.topics]);

  const classes = useStyles();

  const onCategoryAdd = async (newCategory: string): Promise<void> => {};

  return (
    <TableContainer
      component={Paper}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: COLORS.primaryBackground,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-between",
          marginBottom: 100,
          width: 700,
          padding: 20,
          borderRadius: 10,
          borderWidth: 5,
          borderColor: "transparent",
          borderStyle: "solid",
          //backgroundColor: "#ff981b",
        }}
      >
        <Paper component="form" className={classes.root}>
          <div>
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Filter Topics"
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
              inputProps={{ "aria-label": "search google maps" }}
            />
          </div>
        </Paper>
        <div>
          <CustomButton
            onClick={() => setTopicAddDialog(true)}
            title="INSERT NEW TOPIC"
          />
        </div>
      </div>

      <Table className={classes.table} aria-label="customized table">
        <colgroup>
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "50%" }} />
        </colgroup>

        <TableHead>
          <TableRow
            style={{
              color: "#fff",
              backgroundColor: COLORS.darkerOrange,
            }}
          >
            <TableCell
              style={{
                color: "#fff",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              title
            </TableCell>

            <TableCell
              style={{
                color: "#fff",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              source
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              related
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topics.map((topic: Topic) => {
            if (
              topic.title &&
              topic.title.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return (
                <StyledTableRow>
                  <StyledTableCell> {topic.title}</StyledTableCell>
                  <StyledTableCell>{topic.title}</StyledTableCell>
                  <StyledEditCell>
                    {topic.title}
                    <div
                      style={{
                        position: "absolute",
                        right: 30,
                        color: "orange",
                        top: "20%",
                        cursor: "pointer",
                        width: 80,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <EditIcon
                        style={{
                          cursor: "pointer",
                          color: COLORS.primaryOrange,
                        }}
                        onClick={() => {
                          // report.question &&
                          //   setCurrentReportQuestion(report.question);
                          // setCurrentReportId(report.id);
                          // setEditDialog(true);
                        }}
                      />
                      <DeleteIcon
                        onClick={() => {
                          //setCurrentReportId(report.id);
                          setDeleteDialog(true);
                        }}
                        style={{
                          cursor: "pointer",
                          color: COLORS.darkerOrange,
                        }}
                      />
                    </div>
                  </StyledEditCell>
                </StyledTableRow>
              );
            }
          })}
        </TableBody>
      </Table>
      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {}}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />

      <TopicAddDialog
        open={topicAddDialog}
        onConfirm={(topic: string) => {
          setTopicAddDialog(false);
          //onCategoryAdd(categ);
        }}
        onRefuse={() => {
          setTopicAddDialog(false);
        }}
      />

      <CustomAlert
        visible={success}
        text="Updated successfully!"
        type="success"
      />
      <CustomAlert visible={error} text="Error adding topic" type="error" />
    </TableContainer>
  );
}
