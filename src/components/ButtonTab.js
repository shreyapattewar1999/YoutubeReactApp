import React from "react";

const ButtonTab = ({ btn, btnClick, index }) => {
  return (
    <div>
      <button
        onClick={() => btnClick(index)}
        className="px-3 py-1 my-3 mx-1 rounded-md "
        style={
          btn.isClicked
            ? {
                color: `rgb(255,255,255)`,
                backgroundColor: `rgb(31,41,55)`,
              }
            : {
                backgroundColor: `rgb(229, 231, 235)`,
                color: `rgb(0, 0, 0)`,
              }
        }
      >
        {btn.name}
      </button>
    </div>
  );
};

export default ButtonTab;
