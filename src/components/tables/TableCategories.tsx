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
import { COLORS } from "../../constants/Colors";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DeleteDialog from "../dialogs/CustomDialog";
import CategoryAddDialog from "../dialogs/CategoryAddDialog";
import CustomAlert from "../CustomAlert";
import CustomButton from "../CustomButton";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "orange",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
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

interface TableCategoriesProps {
  categories: Category[];
}

export default function TableCategories(props: TableCategoriesProps) {
  const [searchText, setSearchText] = React.useState<string>("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoryAddDialog, setCategoryAddDialog] = React.useState<boolean>(
    false
  );

  React.useEffect(() => {
    console.log("my cattt", props.categories);
    setCategories(props.categories);
  }, [props.categories]);

  const classes = useStyles();

  const onCategoryAdd = async (newCategory: string): Promise<void> => {
    const val = await addCategory(newCategory, "EN");
    if (val) {
      categories.push({ title: newCategory });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(true);
    }
  };

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
              placeholder="Filter Categories"
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
              inputProps={{ "aria-label": "search google maps" }}
            />
          </div>
        </Paper>
        <div>
          <CustomButton
            onClick={() => setCategoryAddDialog(true)}
            title="INSERT NEW CATEGORY"
          />
        </div>
      </div>

      <Table className={classes.table} aria-label="customized table">
        <colgroup>
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
              title
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category: Category) => {
            if (
              category.title &&
              category.title.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return (
                <StyledTableRow>
                  <StyledTableCell> {category.title}</StyledTableCell>
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

      <CategoryAddDialog
        open={categoryAddDialog}
        onConfirm={(categ: string) => {
          setCategoryAddDialog(false);
          onCategoryAdd(categ);
        }}
        onRefuse={() => {
          setCategoryAddDialog(false);
        }}
      />

      <CustomAlert
        visible={success}
        text="Updated successfully!"
        type="success"
      />
      <CustomAlert visible={error} text="Error adding category" type="error" />
    </TableContainer>
  );
}
