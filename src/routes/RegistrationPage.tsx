import React from "react";
import { register } from "../api/api";
import TransactionAlert from "../components/alerts/TransactionAlert";
import Chip from "../components/filters/Chip";
import Form from "../components/input/Form";
import { CONSTANTS } from "../constants/constants";
import { ComponentType, Language } from "../interfaces/Interfaces";
import { getHash } from "../utils/utils";

export default function RegistrationPage({ token }: ComponentType) {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [languages, setLanguages] = React.useState<string[]>([]);

  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    []
  );
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLanguages(CONSTANTS.languages.map((language) => language.label));
  }, []);

  const onSubmit = async (): Promise<void> => {
    setError(false);
    if (!username || !password || selectedLanguages.length == 0) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const val = await register(
      getHash(username),
      username,
      password,
      getSelectedLanguageValues(selectedLanguages),
      token
    );
    if (val) {
      alert("ok");
    } else {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      setUsername("");
      setPassword("");
    }
  };
  const getSelectedLanguageValues = (languages: string[]): string[] => {
    const values: string[] = [];
    languages.forEach((selectedLang: string) => {
      const lang = CONSTANTS.languages.find((l) => l.label == selectedLang);
      if (lang) values.push(lang.value);
    });
    return values;
  };

  const handleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectedLanguages(event.target.value);
  };

  return (
    <>
      <Form
        onChangeUsername={(text: string) => setUsername(text)}
        onChangePassword={(text: string) => setPassword(text)}
        onSubmit={onSubmit}
        password={password}
        username={username}
        error={error}
        height="50ch"
        children={
          <>
            <div style={{ alignSelf: "center" }}>
              <Chip
                width={200}
                selectedValues={selectedLanguages}
                values={languages}
                header="Languages"
                error={error}
                handleChange={handleChange}
              />
            </div>
          </>
        }
      />

      <TransactionAlert
        success={success}
        error={error}
        messageError="Registration Failed"
      />
    </>
  );
}
