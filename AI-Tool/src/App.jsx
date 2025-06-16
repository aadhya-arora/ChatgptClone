import { useEffect, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answers from "./components/Answers";
import { FiTrash } from "react-icons/fi";
function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState([]);
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

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch("http://localhost:5000/history");
      const data = await res.json();
      setRecentHistory(data.reverse());
    };
    fetchHistory();
  }, []);

  const handleDeleteAll = async () => {
    const res = await fetch("http://localhost:5000/delete-all", {
      method: "DELETE",
    });
    if (res.ok) {
      setRecentHistory([]); // Clear local history
    }
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

    await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer: dataString }),
    });
  };
  console.log(result);
  return (
    <div className="page">
      <div className="nav">
        <div className="history">
          <div className="search-heading">
            <span>Search History</span>
            <button className="del" onClick={handleDeleteAll}>
              <FiTrash />
            </button>
          </div>

          <ul>
            {recentHistory.map((item, index) => (
              <li key={index} className="history-item">
                {item.question}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="main">
        <div className="container">
          <ul>
            {result.map((item, index) => (
              <div
                className={item.type == "q" ? "ques" : "ans"}
                key={index + Math.random()}
              >
                {item.type === "q" ? (
                  <li className="main_ques" key={index + Math.random()}>
                    <Answers
                      ans={item.text}
                      totalResult={1}
                      index={index}
                      type={item.type}
                    />
                  </li>
                ) : (
                  item.text.map((ansItem, ansIndex) => (
                    <li className="main_text" key={ansIndex + Math.random()}>
                      <Answers
                        ans={ansItem}
                        totalResult={item.length}
                        index={ansIndex}
                        type={item.type}
                      />
                    </li>
                  ))
                )}
              </div>
            ))}
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
