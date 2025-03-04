import "./App.css";

import Description from "../Description/Description.jsx";
import Options from "../Options/Options.jsx";
import Feedback from "../Feedback/Feedback.jsx";
import Notification from "../Notification/Notification.jsx";

import { initialRatings, storageKey } from "../../constants.jsx";
import { useEffect, useState } from "react";

function App() {
  const [ratings, setRatings] = useState(() => {
    const dataStr = localStorage.getItem(storageKey);

    if (dataStr) return JSON.parse(dataStr);

    return initialRatings;
  });

  useEffect(() => {
    const dataStr = JSON.stringify(ratings);
    localStorage.setItem(storageKey, dataStr);
  }, [ratings]);

  const totalFeedback = () => {
    let feedback = 0;
    Object.keys(ratings).forEach((rating) => (feedback += ratings[rating]));
    return feedback;
  };

  const handleResetClick = () => {
    setRatings(initialRatings);
  };

  const updateFeedback = (feedbackType) => {
    setRatings({
      ...ratings,
      [feedbackType]: ratings[feedbackType] + 1,
    });
  };

  const positivePercentage = Math.round(
    (ratings["good"] / totalFeedback()) * 100
  );

  return (
    <div>
      <Description
        name={"Sip Happens Café"}
        descText={
          "Please leave your feedback about our service by selecting one of the options below."
        }
      ></Description>
      <Options
        ratingKeys={Object.keys(ratings)}
        onOptionClick={updateFeedback}
        onReset={handleResetClick}
        totalFeedback={totalFeedback()}
      ></Options>
      {totalFeedback() !== 0 ? (
        <Feedback
          ratings={ratings}
          totalFeedback={totalFeedback()}
          positivePercentage={positivePercentage}
        ></Feedback>
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
