import React from "react";
import TableReports from "../components/tables/TableReports";
import HeaderSection from "../components/HeaderSection";
import Menu from "../components/Menu";

import { COLORS } from "../constants/colors";
import { addReport, getReports, getTopics } from "../api/api";
import { useParams } from "react-router-dom";
import {
  Question,
  Report,
  ReportHandled,
  Topic,
} from "../interfaces/Interfaces";
export default function ViewPage() {
  const { lang }: { lang: string } = useParams();
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      const newReport: Report = {
        question_id: 16728752,
        reason: "no res",
      };
      //await addReport(newReport, "EN");
    })();

    (async () => {
      const reports = await getReports("EN");
      if (reports) setReports(reports);
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
      <TableReports reports={reports} topics={topics} />
    </div>
  );
}

/*

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
      <TableReports reports={reports} topics={topics} />
    </div>

    */
