import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="nav"></div>
      <div className="main">
        <div className="container"></div>
        <div className="question">
          <input type="text" placeholder="Ask me anything" className="typing" />
          <button className="ask">Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
