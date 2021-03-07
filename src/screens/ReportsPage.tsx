import React from "react";
import TableReports from "../components/TableReports";
import HeaderSection from "../components/HeaderSection";
import { COLORS } from "../constants/Colors";
import { getReports, getTopics } from "../api/api";
import { useParams } from "react-router-dom";
import { Question, Report } from "../interfaces/Interfaces";
export default function ViewPage() {
  const { lang }: { lang: string } = useParams();
  const [reports, setReports] = React.useState<Report[]>([]);

  React.useEffect(() => {
    (async () => {
      /*  const retrievedQuestions = await getQuestions(lang);
      if (retrievedQuestions && Array.isArray(retrievedQuestions)) {
        console.log(retrievedQuestions);
        setQuestions(retrievedQuestions);
      }*/
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const reports = await getReports("EN");
      setReports(reports);
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
      <HeaderSection title="Reports" />
      <TableReports reports={reports} />
    </div>
  );
}
