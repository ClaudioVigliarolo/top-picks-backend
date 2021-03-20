import React from "react";
import { COLORS } from "../constants/Colors";
import { getCategories } from "../api/api";
import { useParams } from "react-router-dom";
import {
  Category,
  ComponentType,
  Question,
  Report,
  Topic,
} from "../interfaces/Interfaces";
import TableCategories from "../components/tables/TableCategories";
export default function ViewPage({ token }: ComponentType) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    (async () => {
      const retrievedCategories = await getCategories("EN", token);
      if (retrievedCategories && Array.isArray(retrievedCategories)) {
        setCategories(retrievedCategories);
      }
    })();
  }, []);

  return <TableCategories token={token} categories={categories} />;
}
