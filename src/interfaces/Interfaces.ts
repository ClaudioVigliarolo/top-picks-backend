export interface Topic {
    title: string;
    id:number;
    source:string;
    timestamp:string;
  }

export  interface Category {
    title: string;
    id:number;
  //  counter: number;
  }

 export interface RetrievedTopics{
    category_topics: TopicCategory[],
    related:Related[],
    topics:Topic[]
  
  }

  export  interface TopicCategory {
    category_id: number;
    topic_id:number;
  //  counter: number;
  }

  export  interface Related {
  }

 export interface Question {
    id: number;
    topic_id:number;
    title: string;
    timestamp:string;
  }

  //report coming from the external world
  export interface Report {
    question_id: number;
    reason:string;
  }

  //report handled by the app
  export interface ReportHandled extends Report {
    title:string;
    topic_id:number;
    timestamp:string;
  }

  export enum Lang {
    italian = 'IT',
    english = 'EN',
  }


  export interface EditItem{
    label: string;
    text:string;
};