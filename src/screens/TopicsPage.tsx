import React from "react";
import TableReports from "../components/tables/TableReports";
import HeaderSection from "../components/HeaderSection";
import Menu from "../components/Menu";

import { COLORS } from "../constants/Colors";
import { getCategories, getTopics } from "../api/api";
import { useParams } from "react-router-dom";
import {
  Category,
  TopicCategory,
  Question,
  Related,
  Report,
  RetrievedTopics,
  Topic,
} from "../interfaces/Interfaces";
import TableTopics from "../components/tables/TableTopics";

export default function TopicsPage() {
  const { lang }: { lang: string } = useParams();
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topicCategories, setTopicCategories] = React.useState<TopicCategory[]>(
    []
  );
  const [related, setRelated] = React.useState<Related[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      const retrievedTopics = await getTopics("EN");
      if (retrievedTopics != null) {
        setTopics(retrievedTopics.topics);
        setTopicCategories(retrievedTopics.category_topics);
        setRelated(retrievedTopics.related);
      }
    })();

    (async () => {
      const retrievedCategories = await getCategories("EN");
      if (retrievedCategories != null) {
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
      <TableTopics
        topics={topics}
        categories={categories}
        topicCategories={topicCategories}
        related={related}
      />
    </div>
  );
}
