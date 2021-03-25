import React from 'react';
import { COLORS } from '../constants/Colors';
import {
  Category,
  PageProps,
  Question,
  Report,
  Topic,
} from '../interfaces/Interfaces';
import TableQuestions from '../components/tables/TableQuestions';
import { getQuestions, getTopics } from '../api/api';

export default function TopicsPage({ token, currentLanguage }: PageProps) {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      const retrievedQuestions = await getQuestions(currentLanguage, token);
      if (retrievedQuestions != null) {
        setQuestions(retrievedQuestions);
      }
    })();

    (async () => {
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics) {
        setTopics(retrievedTopics.topics);
      }
    })();
  }, [currentLanguage]);

  return (
    <TableQuestions
      token={token}
      questions={questions}
      topics={topics}
      currentLanguage={currentLanguage}
    />
  );
}
