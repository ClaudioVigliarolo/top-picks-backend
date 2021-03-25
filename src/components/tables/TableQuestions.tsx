import React from 'react';
import {
  CustomTable,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from './TableStyles';
import { CONSTANTS } from '../../constants/constants';
import { Question, Topic } from '../../interfaces/Interfaces';
import { addQuestions, deleteQuestion, updateQuestion } from '../../api/api';
import { getFormattedDate, getHash } from '../../utils/utils';
import DeleteDialog from '../dialogs/ConfirmDialog';
import QuestionAddDialog from '../dialogs/QuestionDialog';
import QuestionEditDialog from '../dialogs/QuestionDialog';
import CustomButton from '../buttons/CustomButton';
import SearchBar from '../input/searchBar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TransactionAlert from '../alerts/TransactionAlert';

interface TableQuestionsProps {
  questions: Question[];
  topics: Topic[];
  token: string;
  currentLanguage: string;
}

export default function TableQuestions(props: TableQuestionsProps) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [questionAddDialog, setQuestionAddDialog] = React.useState<boolean>(
    false
  );
  const [currentTopicId, setCurrentTopicId] = React.useState<number>(-1);

  const [currentQuestionId, setCurrentQuestionId] = React.useState<number>(-1);
  const classes = useStyles();

  const [
    currentQuestionTitle,
    setCurrentQuestionTitle,
  ] = React.useState<string>('');

  React.useEffect(() => {
    setQuestions(props.questions);
    setTopics(props.topics);
  }, [props.questions]);

  const onQuestionAdd = async (
    newTitle: string,
    topicId: number
  ): Promise<void> => {
    const newQuestion: Question = {
      id: getHash(newTitle + '*' + newTitle),
      title: newTitle,
      topic_id: topicId,
      timestamp: Date(),
    };
    const val = await addQuestions(
      [newQuestion],
      props.currentLanguage,
      props.token
    );
    const newQuestions = questions;

    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }

    newQuestions.unshift(newQuestion);
    setQuestions([...newQuestions]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onQuestionDelete = async (id: number): Promise<void> => {
    const val = await deleteQuestion(id, props.currentLanguage, props.token);
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const newQuestions = questions.filter((categ: Question) => categ.id != id);
    setQuestions([...newQuestions]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };
  const onQuestionUpdate = async (
    id: number,
    newTitle: string,
    topicId: number
  ): Promise<void> => {
    const val = await updateQuestion(
      id,
      newTitle,
      topicId,
      props.currentLanguage,
      props.token
    );
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const newQuestions = questions;
    newQuestions.forEach(function (item: Question) {
      if (item.id == id) {
        item.title = newTitle;
        item.topic_id = topicId;
        item.timestamp = Date();
      }
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
    setQuestions([...newQuestions]);
  };

  const onEdit = (id: number, title: string, topicId: number) => {
    setCurrentQuestionTitle(title);
    setCurrentTopicId(topicId);
    setCurrentQuestionId(id);
    setEditDialog(true);
  };

  const onDelete = (id: number) => {
    setCurrentQuestionId(id);
    setDeleteDialog(true);
  };

  const getTopicTitle = (topicId: number): string => {
    const myTopic = topics.find((topic) => topic.id == topicId);
    return myTopic ? myTopic.title : 'error:topic removed';
  };

  const getTopicIdByTitle = (topicTitle: string): number => {
    const myTopic = topics.find((topic) => topic.title == topicTitle);
    return myTopic ? myTopic.id : -1;
  };

  const renderRows = (questions: Question[]) => {
    return questions.map((question: Question, index: number) => {
      if (question.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell>
              {getTopicTitle(question.topic_id)}
            </StyledTableCell>

            <StyledTableCell>
              {getFormattedDate(question.timestamp)}
            </StyledTableCell>

            <StyledEditCell>
              {question.title}
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(question.id, question.title, question.topic_id);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(question.id);
                  }}
                  className={classes.deleteIcon}
                />
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
  };
  {
    console.log('tt', topics);
  }
  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Topics"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <div>
          <CustomButton
            onClick={() => setQuestionAddDialog(true)}
            title="INSERT NEW QUESTION"
          />
        </div>
      </div>

      <CustomTable
        columns={['15%', '15%', '70%']}
        columnNames={['topic', 'last update', 'question']}
        body={renderRows(questions)}
      />
      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onQuestionDelete(currentQuestionId);
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />

      <QuestionEditDialog
        open={editDialog}
        topics={topics.map((t) => t.title)}
        onConfirm={(newTitle: string, topicTitle: string) => {
          onQuestionUpdate(
            currentQuestionId,
            newTitle,
            getTopicIdByTitle(topicTitle)
          );
          setEditDialog(false);
          setCurrentQuestionId(-1);
          setCurrentQuestionTitle('');
          setCurrentTopicId(-1);
        }}
        headerText="Editing Question"
        question={currentQuestionTitle}
        topic={getTopicTitle(currentTopicId)}
        onRefuse={() => {
          setEditDialog(false);
          setCurrentQuestionId(-1);
          setCurrentQuestionTitle('');
        }}
      />

      <QuestionAddDialog
        topics={topics.map((t) => t.title)}
        topic=""
        headerText="Add a new Question"
        question=""
        open={questionAddDialog}
        onConfirm={(newTitle: string, topicTitle: string) => {
          onQuestionAdd(newTitle, getTopicIdByTitle(topicTitle));
          setCurrentQuestionId(-1);
          setCurrentTopicId(-1);
          setCurrentQuestionTitle('');
          setQuestionAddDialog(false);
        }}
        onRefuse={() => {
          setQuestionAddDialog(false);
          setCurrentQuestionId(-1);
          setCurrentQuestionTitle('');
        }}
      />
      <TransactionAlert success={success} error={error} />
    </>
  );
}
