import React from "react";
import { getReports, getTopics } from "../api/api";
import TableReports from "../components/tables/TableReports";
//import { COLORS } from "../constants/colors";
import { Report, ReportHandled, Topic } from "../interfaces/Interfaces";
export default function ReportsPage() {
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
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
        backgroundColor: "orange",
      }}
    >
      <TableReports reports={reports} topics={topics} />
    </div>
  );
}
