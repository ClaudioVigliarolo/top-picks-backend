import React from "react";
import TableReports from "../components/tables/TableReports";
import HeaderSection from "../components/HeaderSection";
import Menu from "../components/Menu";

import { COLORS } from "../constants/colors";
import { getCategories, getReports, getTopics, getQuestions } from "../api/api";
import { useParams } from "react-router-dom";
import { Category, Question, Report, Topic } from "../interfaces/Interfaces";
import TableQuestions from "../components/tables/TableQuestions";

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
