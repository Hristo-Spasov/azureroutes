import style from "./RadioButtons.module.scss";

interface RadioButtonsProps {
  airportChecked: string;
  searchOption: string;
  flightChecked: string;
  searchOptionHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtons = (props: RadioButtonsProps) => {
  const { airportChecked, flightChecked, searchOptionHandler, searchOption } =
    props;
  return (
    <div className={style.radio_container}>
      <label htmlFor={airportChecked}>
        <input
          type="radio"
          name="search_option"
          id={airportChecked}
          value={airportChecked}
          checked={searchOption === airportChecked}
          onChange={searchOptionHandler}
        />
        Search for Airport
      </label>

      <label htmlFor={flightChecked}>
        {" "}
        <input
          type="radio"
          name="search_option"
          id={flightChecked}
          value={flightChecked}
          checked={searchOption === flightChecked}
          onChange={searchOptionHandler}
        />
        Search for Flight
      </label>
    </div>
  );
};

export default RadioButtons;
