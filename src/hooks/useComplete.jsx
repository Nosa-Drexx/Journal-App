import { useEffect, useState } from "react";

const useComplete = (...conditions) => {
  const [completelyFilled, setCompletelyFilled] = useState(false);

  useEffect(() => {
    const allConditionsGreater = conditions.every((elems) => elems.length > 0);

    allConditionsGreater
      ? setCompletelyFilled(true)
      : setCompletelyFilled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...conditions]);

  return completelyFilled;
};

export default useComplete;
