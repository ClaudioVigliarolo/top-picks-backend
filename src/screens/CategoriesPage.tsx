import React from "react";
import { COLORS } from "../constants/Colors";
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

  return <TableCategories categories={categories} />;
}
