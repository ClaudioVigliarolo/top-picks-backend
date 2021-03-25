import { RouteProps } from 'react-router-dom';

export interface Topic {
  title: string;
  id: number;
  source: string;
  timestamp: string;
}

export interface Category {
  title: string;
  id: number;
  //  counter: number;
}

export interface RetrievedTopics {
  category_topics: TopicCategory[];
  related: Related[];
  topics: Topic[];
}

export interface TopicCategory {
  category_id: number;
  topic_id: number;
  //  counter: number;
}

export interface Related {}

export interface Question {
  id: number;
  topic_id: number;
  title: string;
  timestamp: string;
}

//report coming from the external world
export interface Report {
  question_id: number;
  reason: string;
}

//report handled by the app
export interface ReportHandled extends Report {
  title: string;
  topic_id: number;
  timestamp: string;
}
export interface Language {
  label: string;
  value: string;
}

export interface EditItem {
  label: string;
  text: string;
}

export interface User {
  type: string;
  username: string;
  email: string;
  languages: string[];
}
export interface LoggedUser extends User {
  token: string;
}

export interface CreatedUser extends User {
  id: number;
  password: string;
}

export interface PageProps {
  navigationProps: React.ComponentType<RouteProps>;
  token: string;
  currentLanguage: string;
}
