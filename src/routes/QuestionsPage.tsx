import React from "react";
import { COLORS } from "../constants/Colors";
import {
  Category,
  ComponentType,
  Question,
  Report,
  Topic,
} from "../interfaces/Interfaces";
import TableQuestions from "../components/tables/TableQuestions";
import { getQuestions, getTopics } from "../api/api";

export default function TopicsPage({ token }: ComponentType) {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      const retrievedQuestions = await getQuestions("EN", token);
      if (retrievedQuestions != null) {
        setQuestions(retrievedQuestions);
      }
    })();

    (async () => {
      const retrievedTopics = await getTopics("EN", token);
      if (retrievedTopics) {
        setTopics(retrievedTopics.topics);
      }
    })();
  }, []);

  return <TableQuestions token={token} questions={questions} topics={topics} />;
}
