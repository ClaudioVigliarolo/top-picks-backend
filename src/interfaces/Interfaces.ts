export interface Topic {
    title: string;
  }

export  interface Category {
    title: string;
  //  counter: number;
  }

 export interface Question {
    id: number;
    title: string;
    topic:string;
  }

  export interface Report {
    id: number;
    topic:string;
    reason:string;
    date?:string;
    question?:string;
  }

  
  export enum Lang {
    italian = 'IT',
    english = 'EN',
  }


  export interface EditItem{
    label: string;
    text:string;
};