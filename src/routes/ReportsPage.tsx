import React from 'react';
import { getReports, getTopics } from '../api/api';
import TableReports from '../components/tables/TableReports';
//import { COLORS } from "../constants/colors";
import {
  PageProps,
  Report,
  ReportHandled,
  Topic,
} from '../interfaces/Interfaces';
export default function ReportsPage({ token, currentLanguage }: PageProps) {
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      const reports = await getReports(currentLanguage, token);
      if (reports) setReports(reports);
    })();

    (async () => {
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics) {
        setTopics(retrievedTopics.topics);
      }
    })();
  }, [currentLanguage]);

  return (
    <TableReports
      token={token}
      reports={reports}
      topics={topics}
      currentLanguage={currentLanguage}
    />
  );
}
