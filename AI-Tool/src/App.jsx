import { useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answers from "./components/Answers";
function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };
  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    //  console.log(dataString);
    setResult([
      ...result,
      { type: "q", text: question },
      { type: "a", text: dataString },
    ]);
  };
  console.log(result);
  return (
    <div className="page">
      <div className="nav">
        <div className="history">
          <p>Search History</p>
        </div>
      </div>
      <div className="main">
        <div className="container">
          <ul>
            {result.map((item, index) =>
              item.type === "q" ? (
                <li className="main_text" key={index + Math.random()}>
                  <Answers ans={item.text} totalResult={1} index={index} />
                </li>
              ) : (
                item.text.map((ansItem, ansIndex) => (
                  <li className="main_text" key={ansIndex + Math.random()}>
                    <Answers
                      ans={ansItem}
                      totalResult={item.length}
                      index={ansIndex}
                    />
                  </li>
                ))
              )
            )}
          </ul>
          {/* <ul>
            {result &&
              result.map((item, index) => (
                <li className="main_text" key={index + Math.random()}>
                  <Answers
                    ans={item}
                    totalResult={result.length}
                    index={index}
                  />
                </li>
              ))}
          </ul> */}
        </div>
        <div className="question">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask me anything"
            className="typing"
          />
          <button onClick={askQuestion} className="ask">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
