import React from "react";
import TableReports from "../components/tables/TableReports";
import HeaderSection from "../components/HeaderSection";
import Menu from "../components/Menu";

import { COLORS } from "../constants/Colors";
import { getCategories, getReports, getTopics, getQuestions } from "../api/api";
import { useParams } from "react-router-dom";
import { Category, Question, Report, Topic } from "../interfaces/Interfaces";
import TableQuestions from "../components/tables/TableQuestions";
const [questions, setQuestions] = React.useState<Question[]>([]);

export default function TopicsPage() {
  const { lang }: { lang: string } = useParams();
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      /*  const retrievedQuestions = await getQuestions(lang);
        if (retrievedQuestions && Array.isArray(retrievedQuestions)) {
          console.log(retrievedQuestions);
          setQuestions(retrievedQuestions);
        }*/
    })();

    (async () => {
      const retrievedTopics = await getTopics("EN");
      if (retrievedTopics && Array.isArray(retrievedTopics)) {
        setTopics(retrievedTopics);
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
      <TableQuestions topics={topics} />
    </div>
  );
}
