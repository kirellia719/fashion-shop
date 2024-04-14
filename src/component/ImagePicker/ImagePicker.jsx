import { Accordion } from "rsuite";
import "./ImagePicker.scss";

const ImagePicker = ({ data, value = [], onChange, groupBy }) => {
  const handleSelect = (v) => {
    const checkExist = value.find((item) => item === v);
    if (checkExist) {
      const newValue = value.filter((item) => item !== v);
      onChange && onChange(newValue);
    } else {
      onChange && onChange([...value, v]);
    }
  };

  return (
    <div className="ImagePicker">
      <div className="image-list">
        {data.map((option, index) => {
          const findIndex =
            value.findIndex((item) => item === option.value) + 1;
          return (
            <div
              className={`image-item ${findIndex ? "active" : ""}`}
              onClick={() => handleSelect(option.value)}
              key={index}
            >
              <img src={option.image} alt="" />
              {findIndex ? (
                <div className="image-number">{findIndex}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePicker;
