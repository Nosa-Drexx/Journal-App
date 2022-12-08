import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFor } from "../store/actions";

function SearchBar() {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.todos.AllState);

  //Updates searchState in store whenever a searchList changes or state changes
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < searchList.length; i++) {
      const lists = searchList[i].todo.toLowerCase();
      const value = state.toLowerCase();
      if (lists.includes(value)) {
        arr.push(searchList[i]);
      }
    }
    if (state.length) {
      dispatch(searchFor(arr));
    } else {
      dispatch(searchFor(searchList));
    }
  }, [state, searchList]); //eslint-disable-line

  function searchThrough(e) {
    setState(e.target.value);
  }

  return (
    <section className="search-area">
      <form>
        <div>
          <label htmlFor="search">
            <input
              id="search"
              name="search"
              value={state}
              onChange={(e) => searchThrough(e)}
              placeholder="Search for todo..."
              type="search"
            />
          </label>
          <button onClick={(e) => e.preventDefault()}></button>
        </div>
      </form>
    </section>
  );
}

export default SearchBar;
