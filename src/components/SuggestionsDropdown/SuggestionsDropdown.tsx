import { AutoSuggestionsType } from "../../types/autosuggestion_types";
import style from "./SuggestionsDropdown.module.scss";

interface SuggestionsDropdownProps {
  suggestionsArray: AutoSuggestionsType[];
  // handleSuggestionKeyClick: (
  //   value: AutoSuggestionsType,
  //   e: React.KeyboardEvent<HTMLLIElement>
  // ) => void;
  handleSuggestionClick: (value: AutoSuggestionsType) => void;
}

const SuggestionsDropdown = (props: SuggestionsDropdownProps) => {
  const { suggestionsArray, handleSuggestionClick } = props;
  return (
    <>
      {suggestionsArray.length > 0 && (
        <ul id="auto-suggestion" className={style.dropdown_container}>
          {suggestionsArray.map((suggestion) => (
            <li
              key={suggestion.id}
              value={`${suggestion.airport_name}, ${suggestion.location}`}
              // onKeyDown={(e) => handleSuggestionKeyClick(suggestion, e)}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {`${suggestion.airport_name}, ${suggestion.location}`}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SuggestionsDropdown;
