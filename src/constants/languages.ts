import { Language } from "@material-ui/icons";

export interface Topic {
    title: string;
  }

export  interface Category {
    title: string;
    counter: number;
  }

 export interface Question {
    id: number;
    title: string;
    selected: boolean;
    liked: boolean;
  }


  export interface Language {
      title:string,
      value:string
  }

export const DEF_LAN = "EN"

  export const languages: Language[]=[
    {title:"italian", value: 'IT'},
    {title:"english", value: 'EN'},
  ]
