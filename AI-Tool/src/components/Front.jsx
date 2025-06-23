import { useEffect, useRef, useState } from "react";
import "./Front.css";
import { URL } from "./constants";
import Answers from "../components/Answers";
import { FiTrash } from "react-icons/fi";

function Front() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState("");
  const [user, setUser] = useState(null);
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);
  const [theme, setTheme] = useState("dark");

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error();
        setUser(data);
      })
      .catch(() => (window.location.href = "/"));
  }, []);

  useEffect(() => {
    // Fetch history
    fetch("http://localhost:5000/history", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const uniqueMap = new Map();
        data.reverse().forEach((item) => {
          if (!uniqueMap.has(item.question)) {
            uniqueMap.set(item.question, item);
          }
        });
        setRecentHistory(Array.from(uniqueMap.values()));
      });
  }, []);

  const handleDeleteAll = async () => {
    await fetch("http://localhost:5000/delete-all", { method: "DELETE" });
    setRecentHistory([]);
  };

  const deleteSingleItem = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, { method: "DELETE" });
    setRecentHistory((prev) => prev.filter((item) => item._id !== id));
  };

  const askQuestion = async () => {
    const payloaddata = question || selectedHistory?.question;
    if (!payloaddata) return;

    const payload = {
      contents: [{ parts: [{ text: payloaddata }] }],
    };

    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text
      .split(/\n\* /)
      .map((item) => item.trim());

    setResult((prev) => [
      ...prev,
      { type: "q", text: payloaddata },
      { type: "a", text: dataString },
    ]);
    setQuestion("");

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);

    await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ question: payloaddata, answer: dataString }),
    });

    const res = await fetch("http://localhost:5000/history", {
      credentials: "include",
    });
    const newHistory = await res.json();
    const uniqueMap = new Map();
    newHistory.reverse().forEach((item) => {
      if (!uniqueMap.has(item.question)) {
        uniqueMap.set(item.question, item);
      }
    });
    setRecentHistory(Array.from(uniqueMap.values()));
  };

  const isEnter = (event) => {
    if (event.key === "Enter") askQuestion();
  };

  useEffect(() => {
    if (selectedHistory) {
      setResult((prev) => [
        ...prev,
        { type: "q", text: selectedHistory.question },
        { type: "a", text: selectedHistory.answer },
      ]);
    }
  }, [selectedHistory]);

  return (
    <div className={`page ${theme}`}>
      <div className="nav">
        <div className="history">
          <div className="search-heading">
            <span>Search History</span>
            <button className="del" onClick={handleDeleteAll}>
              <FiTrash />
            </button>
          </div>
          <div className="his_con">
            <ul>
              {recentHistory.map((item, index) => (
                <li key={index} className="history-item">
                  <span onClick={() => setSelectedHistory(item)}>
                    {item.question}
                  </span>
                  <FiTrash
                    className="item-trash"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSingleItem(item._id);
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <select className="mode" onChange={handleThemeChange} value={theme}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      <div className="main">
        <h1 className="intro_heading">
          Hello {user?.username || "User"}, Ask me anything!
        </h1>

        <div ref={scrollToAns} className="container">
          {loader && (
            <div className="loader-wrapper">
              <div className="loader"></div>
            </div>
          )}
          <ul>
            {result.map((item, index) => (
              <div
                className={item.type === "q" ? "ques" : "ans"}
                key={index + Math.random()}
              >
                {item.type === "q" ? (
                  <li className="main_ques">
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
        </div>

        <div className="question">
          <input
            type="text"
            onKeyDown={isEnter}
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

export default Front;
