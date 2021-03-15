import React from "react";
import TableReports from "../components/tables/TableReports";
import HeaderSection from "../components/HeaderSection";
import Menu from "../components/Menu";

import { COLORS } from "../constants/colors";
import { getCategories } from "../api/api";
import { useParams } from "react-router-dom";
import { Category, Question, Report, Topic } from "../interfaces/Interfaces";
import TableCategories from "../components/tables/TableCategories";
export default function ViewPage() {
  const { lang }: { lang: string } = useParams();
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      const retrievedCategories = await getCategories("EN");
      if (retrievedCategories && Array.isArray(retrievedCategories)) {
        setCategories(retrievedCategories);
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
      <TableCategories categories={categories} />
    </div>
  );
}
