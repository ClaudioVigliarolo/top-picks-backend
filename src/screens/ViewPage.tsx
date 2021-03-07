import React from "react";
import Table from "../components/Table";
import HeaderSection from "../components/HeaderSection";
import { COLORS } from "../constants/Colors";
import { getTopics } from "../api/api";
import { useParams } from "react-router-dom";
import { Question } from "../interfaces/Interfaces";
export default function ViewPage() {
  const { lang }: { lang: string } = useParams();
  const [questions, setQuestions] = React.useState<Question[]>([]);

  React.useEffect(() => {
    (async () => {
      /*  const retrievedQuestions = await getQuestions(lang);
      if (retrievedQuestions && Array.isArray(retrievedQuestions)) {
        console.log(retrievedQuestions);
        setQuestions(retrievedQuestions);
      }*/
    })();
  }, []);

  return (
    <div
      style={{
        backgroundColor: COLORS.secondaryBackground,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <HeaderSection title="Questions" />
      <Table />
    </div>
  );
}
