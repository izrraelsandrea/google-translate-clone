import React from "react";
import Header from "./components/layout/Header";
import TranslateForm, { Props } from "./components/TranslateForm";
export interface Languages {
  id: number;
  language: number | string;
}
const languages: Languages[] = [
  {
    id: 1,
    language: "ENGLISH",
  },
  {
    id: 2,
    language: "SPANISH",
  },
];

function App(): React.ReactElement {
  const props: Props = { languages };
  return (
    <>
      <Header />
      <TranslateForm {...props} />
    </>
  );
}

export default App;
