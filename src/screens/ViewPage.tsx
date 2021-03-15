import React from "react";
import HeaderSection from "../components/HeaderSection";
import { COLORS } from "../constants/colors";
import { getTopics } from "../api/api";
import { useParams } from "react-router-dom";
import { Question } from "../interfaces/Interfaces";
export default function ViewPage() {
  const { lang }: { lang: string } = useParams();
  const [questions, setQuestions] = React.useState<Question[]>([]);

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
      <HeaderSection title="Questions" />
    </div>
  );
}
