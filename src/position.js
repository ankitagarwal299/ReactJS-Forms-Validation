import { useState } from "react";

export default function Position(props) {
  const [position, setPosition] = useState(2);
  return (
    <select
      name="position"
      className="positionSelect"
      value={position}
      onChange={(event) => {
        setPosition(event.target.value);
        props.onChangePosition(event);
      }}
    >
      <option>--Select Position---</option>
      {positions.map((pos) => (
        <option key={pos.value} value={pos.value}>
          {pos.name}
        </option>
      ))}
    </select>
  );
}

const positions = [
  { name: "man", value: 0 },
  { name: "senior swe", value: 1 },
  {
    name: "mid level",
    value: 2
  },
  { name: "junior swe", value: 3 }
];
