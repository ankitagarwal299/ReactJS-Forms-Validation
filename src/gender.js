import { useState } from "react";

export default function Gender({ genders, onSelectedGender }) {
  const [gender, setGender] = useState(1);
  return (
    <div>
      <label>Gender </label>
      {genders.map((item) => (
        <span
          type="text"
          key={item.value}
          value={item.value}
          className={item.value === gender ? "gender is-selected" : "gender"}
          onClick={() => {
            setGender(item.value);
            onSelectedGender(item.value);
          }}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}
