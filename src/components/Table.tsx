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
import { Topic } from "../interfaces/Interfaces";
import { useParams } from "react-router-dom";
import { getTopics } from "../api/api";
import { COLORS } from "../constants/Colors";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomDialog from "../components/CustomDialog";
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
      color: "green",
      position: "relative",
      display: "flex",
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
      width: 350,
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

const NO_TOPIC = "Filter by topic";

export default function CustomizedTables() {
  const [topic, setTopic] = React.useState<string>(NO_TOPIC);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [dialog, setDialog] = React.useState<boolean>(true);

  const { lang }: { lang: string } = useParams();

  React.useEffect(() => {
    (async () => {
      const retrievedTopics = await getTopics("EN");
      if (retrievedTopics && Array.isArray(retrievedTopics)) {
        setTopics(retrievedTopics);
      }

      //get all questions

      //get questions of a topic
    })();
  }, []);

  const handleTopicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTopic(event.target.value as string);
  };

  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "orange",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-evenly",
          marginBottom: 100,
        }}
      >
        <Paper component="form" className={classes.root}>
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Filter Questions"
            inputProps={{ "aria-label": "search google maps" }}
          />

          <Divider className={classes.divider} orientation="vertical" />
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
          <col style={{ width: "30%" }} />
          <col style={{ width: "70%" }} />
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
                fontSize: 18,
              }}
            >
              Topic
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: 18,
              }}
            >
              Question
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>ciao</StyledTableCell>
            <StyledEditCell>
              <div style={{ color: "black", width: "85%" }}>
                CIAOCI OCIAO CIAOCIA O CIAOCIA OO CIAOCIA OO CIAOCIA OO CIAOCIA
                OO CIAOCIA OO CIAOCIA OOCIAOCIAOCI AOCIAOCIA OCIAOCIA OCIA
                OCIAOCIAOCIAOC IAOCIAOCIAOCIAO CIAOCIAOCIAOC IAOCIAOCIAOCIAOCIAO
                CIAOCIAOCIAOCIAOCIAO CIAOCIAOCIAOCIAOCIAOCIAOCIAO
              </div>
              <div>
                <EditIcon
                  style={{ position: "absolute", right: 80, color: "orange" }}
                />
                <DeleteIcon
                  style={{
                    position: "absolute",
                    right: 30,
                    color: COLORS.darkerOrange,
                  }}
                />
              </div>
            </StyledEditCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell>ciao</StyledTableCell>
            <StyledEditCell>
              {" "}
              <p>ciao</p>
              <EditIcon />
            </StyledEditCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell>ciao</StyledTableCell>
            <StyledEditCell>ciao</StyledEditCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <CustomDialog
        open={dialog}
        onConfirm={() => {
          setDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDialog(false);
        }}
      />
    </TableContainer>
  );
}
