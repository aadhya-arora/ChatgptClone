import { useEffect, useState } from "react";
import { checkHeading, replaceHeading } from "./helper";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism"; // or any other style

import "./Front.css";
const Answers = ({ ans, totalResult, index, type }) => {
  const [heading, setHeading] = useState(false);
  const [replace, setReplace] = useState(ans);
  useEffect(() => {
    //console.log(ans);
    if (checkHeading(ans)) {
      setHeading(true);
      setReplace(replaceHeading(ans));
    }
  }, []);

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={dark}
          preTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {index == 0 && totalResult > 1 ? (
        <span className="heading">{replace}</span>
      ) : heading ? (
        <span className="answer">{replace}</span>
      ) : (
        <span className={type == "q" ? "inner_ques" : "inner_text"}>
          {/* {replace} */}
          <ReactMarkdown components={renderer}>{replace}</ReactMarkdown>
        </span>
      )}
    </>
  );
};

export default Answers;
