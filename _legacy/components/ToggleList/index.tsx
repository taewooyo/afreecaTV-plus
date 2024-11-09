import Toggle from "../Toggle";

const ToggleList = ({ toggles, onChange }) => {
  return (
    <ul>
      {toggles.map((toggleItem) => (
        <Toggle
          key={toggleItem.label}
          onChange={() => onChange(toggleItem.type)}
          label={toggleItem.label}
          value={toggleItem.value}
        />
      ))}
    </ul>
  );
};

export default ToggleList;
