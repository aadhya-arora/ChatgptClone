import { useState } from "react";
import "./App.css";
import { URL } from "./constants";
function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");
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
    //console.log(response.candidates[0].content.parts[0]);
    setResult(response.candidates[0].content.parts[0].text);
  };
  return (
    <div className="page">
      <div className="nav">
        <div className="history">
          <p>Search History</p>
        </div>
      </div>
      <div className="main">
        <div className="container">{result}</div>
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
