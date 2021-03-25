import React from 'react';
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from './TableStyles';
import {
  Category,
  Topic,
  TopicCategory,
  Related,
} from '../../interfaces/Interfaces';
import { CONSTANTS } from '../../constants/constants';
import { addTopic, deleteTopic, updateTopic } from '../../api/api';
import DeleteDialog from '../dialogs/ConfirmDialog';
import TopicAddDialog from '../dialogs/TopicDialog';
import TopicEditDialog from '../dialogs/TopicDialog';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TransactionAlert from '../alerts/TransactionAlert';
import { getFormattedDate, getHash } from '../../utils/utils';
import SearchBar from '../input/searchBar';
import CustomButton from '../buttons/CustomButton';

interface TableTopicsProps {
  topics: Topic[];
  categories: Category[];
  topicCategories: TopicCategory[];
  related: Related[];
  token: string;
  currentLanguage: string;
}

export default function TableTopics(props: TableTopicsProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [topicCategories, setTopicCategories] = React.useState<TopicCategory[]>(
    []
  );
  const [related, setRelated] = React.useState<Related[]>([]);
  const [currentTopicRelated, setCurrentTopicRelated] = React.useState<
    string[]
  >([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [currentTopicTitle, setCurrentTopicTitle] = React.useState<string>('');
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [currentTopicId, setCurrentTopicId] = React.useState<number>(-1);
  const classes = useStyles();

  React.useEffect(() => {
    setTopics(props.topics);
    setCategories(props.categories);
    setRelated(props.related);
    setTopicCategories(props.topicCategories);
  }, [props.topics, props.categories, props.related, props.topicCategories]);

  const onEdit = (id: number, title: string) => {
    setCurrentTopicTitle(title);
    setCurrentTopicId(id);
    setCurrentTopicRelated([]);
    setEditDialog(true);
  };

  const onDelete = (id: number) => {
    setCurrentTopicId(id);
    setDeleteDialog(true);
  };

  const renderRows = (topics: Topic[]) => {
    return topics.map((topic: Topic, index: number) => {
      if (topic.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {topic.title}</StyledTableCell>
            <StyledTableCell>{topic.source}</StyledTableCell>
            <StyledTableCell>
              {getFormattedDate(topic.timestamp)}
            </StyledTableCell>
            <StyledEditCell>
              no related
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(topic.id, topic.title);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(topic.id);
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

  const onTopicUpdate = async (
    topicTitle: string,
    selectedCategoriesTitle: string[],
    topicId: number
  ): Promise<void> => {
    const selectedCategoriesId: number[] = [];
    selectedCategoriesTitle.forEach((title: string) => {
      const category = categories.find(
        (categ: Category) => categ.title == title
      );
      if (category) selectedCategoriesId.push(category.id);
    });

    const val = await updateTopic(
      topicId,
      topicTitle,
      selectedCategoriesId,
      props.currentLanguage,
      props.token
    );
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    //new topic updated successfully, update locally
    const newTopics = topics;
    const topicIndex = topics.findIndex((topic: Topic) => topic.id == topicId);
    newTopics[topicIndex].title = topicTitle;
    newTopics[topicIndex].timestamp = Date();

    //new categories id, exluding the topic id
    const newTopicCategories = topicCategories.filter(
      (topicCateg: TopicCategory) => topicCateg.topic_id != topicId
    );

    selectedCategoriesId.forEach((id: number) => {
      newTopicCategories.push({ category_id: id, topic_id: topicId });
    });

    //push new updated arrays
    setTopics([...newTopics]);
    setTopicCategories([...newTopicCategories]);

    //newTopics.push({ title: topicTitle, id: categoryHash });
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onTopicAdd = async (
    topicTitle: string,
    selectedCategoriesTitle: string[]
  ): Promise<void> => {
    const selectedCategoriesId: number[] = [];
    selectedCategoriesTitle.forEach((title: string) => {
      const category = categories.find(
        (categ: Category) => categ.title == title
      );
      if (category) selectedCategoriesId.push(category.id);
    });
    const topicID = getHash(topicTitle);
    const val = await addTopic(
      topicID,
      topicTitle,
      'Top Picks Creator',
      selectedCategoriesId,
      props.currentLanguage,
      props.token
    );
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    //new topic added successfully, add locally
    const newTopics = topics;
    const newTopicCategories = topicCategories;

    //update topic array
    newTopics.unshift({
      id: topicID,
      source: 'Top Picks Creator',
      timestamp: Date(),
      title: topicTitle,
    });
    //get categoriesId from selectedCategoriesTitle
    selectedCategoriesId.forEach((id: number) => {
      newTopicCategories.push({ category_id: id, topic_id: topicID });
    });

    //push new updated arrays
    setTopics([...newTopics]);
    setTopicCategories([...newTopicCategories]);

    //newTopics.push({ title: topicTitle, id: categoryHash });
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onTopicDelete = async (id: number): Promise<void> => {
    const val = await deleteTopic(id, props.currentLanguage, props.token);
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const newTopics = topics.filter((topic: Topic) => topic.id != id);
    setTopics([...newTopics]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const getPreselectedCategories = (id: number) => {
    const preselectedCategories: string[] = [];
    topicCategories.forEach((topicCateg: TopicCategory) => {
      if (topicCateg.topic_id == id) {
        const preselectedCateg = categories.find(
          (categ: Category) => categ.id == topicCateg.category_id
        );

        if (preselectedCateg)
          preselectedCategories.push(preselectedCateg.title);
      }
    });
    return preselectedCategories;
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
          <CustomButton
            onClick={() => setTopicAddDialog(true)}
            title="INSERT NEW TOPIC"
          />
        </div>
      </div>
      <CustomTable
        columns={['15%', '20%', '20%', '45%']}
        columnNames={['title', 'source', 'last update', 'related']}
        body={renderRows(topics)}
      />

      <TopicEditDialog
        open={editDialog}
        preselectedCategories={getPreselectedCategories(currentTopicId)}
        topic={currentTopicTitle}
        categories={categories.map((categ) => categ.title)}
        onConfirm={(topicTitle: string, selectedCategoriesTitle: string[]) => {
          onTopicUpdate(topicTitle, selectedCategoriesTitle, currentTopicId);
          setCurrentTopicId(-1);
          setCurrentTopicTitle('');
          setEditDialog(false);
        }}
        onRefuse={() => {
          setCurrentTopicId(-1);
          setCurrentTopicTitle('');
          setEditDialog(false);
        }}
        headerText="Edit Topic"
      />

      <TopicAddDialog
        open={topicAddDialog}
        preselectedCategories={[]}
        categories={categories.map((categ) => categ.title)}
        headerText="Add New Topic"
        topic=""
        onConfirm={(topicTitle: string, selectedCategoriesTitle: string[]) => {
          onTopicAdd(topicTitle, selectedCategoriesTitle);
          setTopicAddDialog(false);
        }}
        onRefuse={() => {
          setTopicAddDialog(false);
        }}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onTopicDelete(currentTopicId);
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />
      <TransactionAlert success={success} error={error} />
    </>
  );
}
