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
import { EditItem, Question, Report, Topic } from "../../interfaces/Interfaces";
import { useParams } from "react-router-dom";
import {
  getTopics,
  removeQuestion,
  removeReport,
  updateQuestion,
} from "../../api/api";
import { COLORS } from "../../constants/Colors";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import DeleteDialog from "../dialogs/CustomDialog";
import EditDialog from "../dialogs/EditDialog";
import CustomAlert from "../CustomAlert";
import { Alert } from "@material-ui/lab";

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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

interface TableReportsProps {
  reports: Report[];
  topics: Topic[];
}

const NO_TOPIC = "Filter by topic";

export default function TableReports(props: TableReportsProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topic, setTopic] = React.useState<string>(NO_TOPIC);
  const [searchText, setSearchText] = React.useState<string>("");
  const [reports, setReports] = React.useState<Report[]>([]);
  const [currentReportId, setCurrentReportId] = React.useState<number>(-1);
  const [
    currentReportQuestion,
    setCurrentReportQuestion,
  ] = React.useState<string>("");
  const [success, setSuccess] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);

  const [editDialog, setEditDialog] = React.useState<boolean>(false);

  const { lang }: { lang: string } = useParams();

  React.useEffect(() => {
    setReports(props.reports);
    setTopics(props.topics);
  }, [props.reports, props.topics]);

  const handleTopicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTopic(event.target.value as string);
  };

  const onReportDelete = async (id: number): Promise<boolean> => {
    console.log("why deleting");
    const success = await removeReport(id, "EN");
    console.log("ss", success);
    if (!success) return false;
    const newReports = reports.filter(function (item: Report) {
      return item.id != id;
    });

    setReports([...newReports]);

    return true;
  };

  const onQuestionUpdate = async (
    id: number,
    newQuestion: string
  ): Promise<boolean> => {
    const success = await updateQuestion(id, newQuestion, "EN");
    if (!success) return false;
    const newReports = reports;
    newReports.forEach(function (item: Report) {
      if (item.id == id) item.question = newQuestion;
    });

    setReports([...newReports]);
    return true;
  };

  const classes = useStyles();

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
          alignSelf: "flex-end",
          justifyContent: "space-between",
          marginBottom: 100,
          width: 700,
          padding: 20,
          borderRadius: 10,
          marginLeft: "40%",
          marginRight: -5,
          // borderWidth: 10,
          // borderStyle: "solid",
          backgroundColor: COLORS.primaryOrange,
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
              placeholder="Filter Reports"
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
              inputProps={{ "aria-label": "search google maps" }}
            />
          </div>
        </Paper>
        <Select
          style={{
            textTransform: "capitalize",
            width: 200,
            fontSize: 20,
            color: "#fff",
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
      </div>

      <Table className={classes.table} aria-label="customized table">
        <colgroup>
          <col style={{ width: "25%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "25%" }} />
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
              Topic
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              Question
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              Reason
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.length == 0 && (
            <h1
              style={{
                position: "absolute",
                color: "white",
                textAlign: "center",
                left: 0,
                right: 0,
                top: "50%",
              }}
            >
              All Reports solved!
            </h1>
          )}

          {reports.map((report: Report) => {
            if (
              report.question &&
              report.question
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              (topic == NO_TOPIC || topic == report.topic)
            ) {
              return (
                <StyledTableRow>
                  <StyledTableCell>{report.topic}</StyledTableCell>
                  <StyledTableCell>{report.question}</StyledTableCell>
                  <StyledEditCell>
                    {report.reason}
                    <div
                      style={{
                        position: "absolute",
                        right: 30,
                        color: "orange",
                        top: "30%",
                        cursor: "pointer",
                        width: 150,
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
                          report.question &&
                            setCurrentReportQuestion(report.question);
                          setCurrentReportId(report.id);
                          setEditDialog(true);
                        }}
                      />
                      <DeleteIcon
                        onClick={() => {
                          setCurrentReportId(report.id);
                          setDeleteDialog(true);
                        }}
                        style={{
                          cursor: "pointer",
                          color: COLORS.darkerOrange,
                        }}
                      />
                      <div
                        onClick={() => onReportDelete(report.id)}
                        style={{
                          cursor: "pointer",
                          color: COLORS.blue,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        ignore
                      </div>
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
        onConfirm={() => {
          setDeleteDialog(false);
          //remove report  from db and local
          if (onReportDelete(currentReportId)) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
          }
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />

      <EditDialog
        open={editDialog}
        onConfirm={async (newQuestion: string) => {
          setEditDialog(false);
          if (
            (await onReportDelete(currentReportId)) &&
            (await onQuestionUpdate(currentReportId, newQuestion))
          ) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
          }
        }}
        id={currentReportId}
        title="Editing question"
        question={currentReportQuestion}
        onRefuse={() => {
          setEditDialog(false);
        }}
      />

      <CustomAlert
        visible={success}
        text="Updated successfully!"
        type="success"
      />
    </TableContainer>
  );
}
