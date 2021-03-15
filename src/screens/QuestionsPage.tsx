import React from "react";
import { COLORS } from "../constants/colors";
import { Category, Question, Report, Topic } from "../interfaces/Interfaces";
import TableQuestions from "../components/tables/TableQuestions";
import { getQuestions, getTopics } from "../api/api";

export default function TopicsPage() {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      const retrievedQuestions = await getQuestions("EN");
      if (retrievedQuestions != null) {
        setQuestions(retrievedQuestions);
      }
    })();

    (async () => {
      const retrievedTopics = await getTopics("EN");
      if (retrievedTopics) {
        setTopics(retrievedTopics.topics);
      }
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        flexDirection: "column",
        backgroundColor: COLORS.primaryBackground,
      }}
    >
      <TableQuestions questions={questions} topics={topics} />
    </div>
  );
}
