import { useState } from "react";
import "./CheckBox.css";

function CheckBox({ checkedState, onChange }) {
  // const [isChecked, setIsChecked] = useState(checkedState);

  // const checkHandler = () => {
  //   setIsChecked(!isChecked);
  // };

  return (
    <>
      <input
        type="checkbox"
        className="checkbox"
        checked={checkedState}
        onChange={onChange}
      />
    </>
  );
}

export default CheckBox;
