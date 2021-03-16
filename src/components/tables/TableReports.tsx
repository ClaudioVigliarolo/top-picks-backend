import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "./TableStyles";
import { CONSTANTS } from "../../constants/constants";
import { Report, ReportHandled, Topic } from "../../interfaces/Interfaces";
import { deleteQuestion, deleteReport, updateQuestion } from "../../api/api";
import DeleteDialog from "../dialogs/ConfirmDialog";
import EditDialog from "../dialogs/EditDialog";
import Select from "../filters/Select";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TransactionAlert from "../alerts/TransactionAlert";
import SearchBar from "../filters/searchBar";

interface TableReportsProps {
  reports: ReportHandled[];
  topics: Topic[];
}

const NO_TOPIC = "Filter by topic";

export default function TableCategories(props: TableReportsProps) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topic, setTopic] = React.useState<string>(NO_TOPIC);
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [currentReportId, setCurrentReportId] = React.useState<number>(-1);
  const [currentReportTitle, setCurrentReportTitle] = React.useState<string>(
    ""
  );
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  React.useEffect(() => {
    setReports(props.reports);
    setTopics(props.topics);
  }, [props.reports, props.topics]);

  const classes = useStyles();

  const handleTopicChange = (event: React.ChangeEvent<{ value: string }>) => {
    setTopic(event.target.value);
  };

  const getTopicIdByTitle = (topicTitle: string): number => {
    const myTopic = topics.find((topic) => topic.title == topicTitle);
    return myTopic ? myTopic.id : -1;
  };

  const onReportEdit = async (
    id: number,
    topicId: number,
    newQuestion: string
  ) => {
    //1 delete report
    const val1 = await deleteReport(id, "EN");

    //2 update the question with new content
    const val2 = await updateQuestion(id, newQuestion, topicId, "EN");

    if (!val1 || !val2) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }

    //update locally
    const newReports = reports.filter(function (item: Report) {
      return item.question_id != id;
    });

    setReports([...newReports]);

    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const getTopicTitle = (topicId: number): string => {
    const myTopic = topics.find((topic) => topic.id == topicId);
    return myTopic ? myTopic.title : "error:topic removed";
  };

  const onQuestionDelete = async (id: number) => {
    //1 delete report
    const val1 = await deleteReport(id, "EN");

    //2 delete the question
    const val2 = await deleteQuestion(id, "EN");

    if (!val1 || !val2) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }

    //update locally
    const newReports = reports.filter(function (item: Report) {
      return item.question_id != id;
    });

    setReports([...newReports]);

    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onReportDelete = async (id: number) => {
    const val = await deleteReport(id, "EN");

    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }

    //update locally
    const newReports = reports.filter(function (item: Report) {
      return item.question_id != id;
    });

    setReports([...newReports]);

    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onEdit = (id: number, title: string) => {
    setCurrentReportTitle(title);
    setCurrentReportId(id);
    setEditDialog(true);
  };

  const onDelete = (id: number) => {
    setCurrentReportId(id);
    setDeleteDialog(true);
  };

  const onIgnore = (id: number) => {
    onReportDelete(id);
  };

  const renderRows = (reports: ReportHandled[]) => {
    return reports.map((report: ReportHandled) => {
      if (report.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow>
            <StyledTableCell>{getTopicTitle(report.topic_id)}</StyledTableCell>
            <StyledTableCell>{report.title}</StyledTableCell>
            <StyledEditCell>
              {report.reason}
              <div style={{ width: 150 }} className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(report.question_id, report.title);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(report.question_id);
                  }}
                  className={classes.deleteIcon}
                />
                <div
                  onClick={() => {
                    onIgnore(report.question_id);
                  }}
                  className={classes.ignoreIcon}
                >
                  ignore
                </div>
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
  };

  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Topics"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <div>
          <Select
            handleChange={handleTopicChange}
            value={topic}
            values={topics.map((t) => t.title)}
            defaultValue={NO_TOPIC}
          />
        </div>
      </div>

      {reports.length > 0 && (
        <CustomTable
          columns={["25%", "50%", "25%"]}
          columnNames={["topic", "question", "reason"]}
          body={renderRows(reports)}
        />
      )}
      {reports.length == 0 && (
        <div className={classes.noItemsAlert}>All Reports have been solved</div>
      )}
      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onQuestionDelete(currentReportId);
          setCurrentReportId(-1);
          setCurrentReportTitle("");
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentReportId(-1);
          setCurrentReportTitle("");
          setDeleteDialog(false);
        }}
      />

      <EditDialog
        open={editDialog}
        onConfirm={(newQuestion: string) => {
          onReportEdit(currentReportId, getTopicIdByTitle(topic), newQuestion);
        }}
        id={currentReportId}
        header="Editing question"
        title={currentReportTitle}
        onRefuse={() => {
          setCurrentReportId(-1);
          setCurrentReportTitle("");
          setEditDialog(false);
        }}
      />
      <TransactionAlert success={success} error={error} />
    </>
  );
}
