import React from "react";
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
  ComponentType,
} from "../interfaces/Interfaces";
import TableTopics from "../components/tables/TableTopics";

export default function TopicsPage({ token }: ComponentType) {
  const { lang }: { lang: string } = useParams();
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topicCategories, setTopicCategories] = React.useState<TopicCategory[]>(
    []
  );
  const [related, setRelated] = React.useState<Related[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      const retrievedTopics = await getTopics("EN", token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics.topics);
        setTopicCategories(retrievedTopics.category_topics);
        setRelated(retrievedTopics.related);
      }
    })();

    (async () => {
      const retrievedCategories = await getCategories("EN", token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
    })();
  }, []);

  return (
    <TableTopics
      topics={topics}
      categories={categories}
      topicCategories={topicCategories}
      related={related}
      token={token}
    />
  );
}
