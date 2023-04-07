import { FocusEvent, useRef, useState } from "react";
import "./TranslateForm.css";
import Modal from "./UI/Modal";
import { Languages } from "../App";

export interface Props {
  languages: Languages[];
}

const TranslateForm: React.FC<Props> = ({ languages }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const selectRefTo = useRef<HTMLSelectElement>(null);
  const [selectValue, setSelectValue] = useState<string | undefined>("ENGLISH");
  const [selectValueTo, setSelectValueTo] = useState<string | undefined>(
    "ESPAÑOL"
  );
  const [result, setResult] = useState<string | undefined>(undefined); //no necesario pues se usa inferencia
  const [isLoading, setIsLoading] = useState(false); //ejemplo con inferencia

  const sendTranslationToGpt = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsLoading(true);

    const textToTranslate = event.target.value;
    const prompt =
      `Translate this into ${selectValueTo} from ${selectValue} \n\ ${textToTranslate}`.toString();
    console.log(prompt);

    const auth = "Bearer " + import.meta.env.VITE_API_KEY;
    console.log(auth);
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 60,
        n: 1,
        temperature: 0.3,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Result: ", data);
        setResult(data.choices[0].message.content);
        setIsLoading(false);
      });
  };
  const selectOnBlurHandler = () => {
    setSelectValue(selectRef.current?.value);
    setSelectValueTo(selectRefTo.current?.value);
  };

  return (
    <>
      <form>
        <div className="child">
          <select ref={selectRef} onBlur={selectOnBlurHandler} name="fromLang">
            {languages.map((data) => {
              return <option value={data.language}>{data.language}</option>;
            })}
          </select>
          <select ref={selectRefTo} onBlur={selectOnBlurHandler} name="toLang">
            {languages
              .slice(0)
              .reverse()
              .map((data) => {
                return <option value={data.language}>{data.language}</option>;
              })}
          </select>
        </div>
        <div className="child">
          <label htmlFor="from" />

          <textarea
            className="textbox"
            id="from"
            name="from"
            onBlur={sendTranslationToGpt}
          ></textarea>

          <label htmlFor="to" />
          <textarea
            className="textbox"
            id="to"
            name="to"
            defaultValue={result ?? ""}
          ></textarea>
        </div>
      </form>
      {isLoading && <Modal message="Translating" />}
    </>
  );
};
export default TranslateForm;
