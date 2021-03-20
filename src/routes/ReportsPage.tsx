import React from "react";
import { getReports, getTopics } from "../api/api";
import TableReports from "../components/tables/TableReports";
//import { COLORS } from "../constants/colors";
import {
  ComponentType,
  Report,
  ReportHandled,
  Topic,
} from "../interfaces/Interfaces";
export default function ReportsPage({ token }: ComponentType) {
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      const reports = await getReports("EN", token);
      if (reports) setReports(reports);
    })();

    (async () => {
      const retrievedTopics = await getTopics("EN", token);
      if (retrievedTopics) {
        setTopics(retrievedTopics.topics);
      }
    })();
  }, []);

  return <TableReports token={token} reports={reports} topics={topics} />;
}
