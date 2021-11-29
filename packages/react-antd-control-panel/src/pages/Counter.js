import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  counterValueSelector,
} from "../redux/counter/counterSlice";

export default function CounterPage() {
  const value = useSelector(counterValueSelector);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="Counter">
        <h1>Circular Slice Dependencies Example</h1>
      </div>
      <h2>Counter Values</h2>
      <ul>
        <li>
          <b>Counter A</b>: {value}
        </li>
      </ul>

      <div>
        <button onClick={() => dispatch(increment())}>Increment A</button>
        <button onClick={() => dispatch(decrement())}>Decrement A</button>
      </div>
    </React.Fragment>
  );
}
