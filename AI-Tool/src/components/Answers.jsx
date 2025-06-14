import { useEffect, useState } from "react";
import { checkHeading, replaceHeading } from "./helper";
import "../app.css";
const Answers = ({ ans, totalResult, index }) => {
  const [heading, setHeading] = useState(false);
  const [replace, setReplace] = useState(ans);
  useEffect(() => {
    //console.log(ans);
    if (checkHeading(ans)) {
      setHeading(true);
      setReplace(replaceHeading(ans));
    }
  }, []);

  return (
    <>
      {index == 0 && totalResult > 1 ? (
        <span className="heading">{replace}</span>
      ) : heading ? (
        <span className="answer">{replace}</span>
      ) : (
        <span className="inner_text">{replace}</span>
      )}
    </>
  );
};

export default Answers;
