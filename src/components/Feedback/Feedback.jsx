import capitalize from "capitalize";
import css from "./Feedback.module.css";

export default function Feedback({ ratings, totalFeedback }) {
  const positivePercentage = Math.round(
    (ratings["good"] / totalFeedback) * 100
  );
  return (
    <div className={css.feedback}>
      {Object.keys(ratings).map((rating, idx) => {
        return (
          <div key={idx}>
            {capitalize(rating)}: {ratings[rating]}
          </div>
        );
      })}
      <div>Total: {totalFeedback}</div>
      <div
        className={css.positivePercentage}
        style={{ "--percentage": positivePercentage }}
      >
        Positive: {positivePercentage}%
      </div>
    </div>
  );
}
