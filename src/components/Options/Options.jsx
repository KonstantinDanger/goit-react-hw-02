import capitalize from "capitalize";
import css from "./Options.module.css";

export default function Options({
  ratingKeys,
  onOptionClick,
  onReset,
  totalFeedback,
}) {
  return (
    <div>
      {ratingKeys.map((rating, index) => {
        return (
          <button
            className={css.options}
            key={index}
            onClick={() => onOptionClick(rating)}
          >
            {capitalize(rating)}
          </button>
        );
      })}
      {totalFeedback > 0 && <button onClick={onReset}>Reset</button>}
    </div>
  );
}
