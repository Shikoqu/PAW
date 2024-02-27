import { Option, Select } from "@material-tailwind/react";
import React from "react";

const options = [
  { icon: "$", label: "USD" },
  { icon: "€", label: "EUR" },
  { icon: "£", label: "GBP" },
  { icon: "¥", label: "JPY" },
];

function SelectCurrency({ onChange }) {
  const handleCurrencyChange = (value) => {
    const selectedOption = options.find((option) => option.label === value);
    onChange(selectedOption.label);
  };

  return (
    <div className="w-48 z-50">
      <Select
        size="md"
        label="Select Currency"
        onChange={handleCurrencyChange}
        value={"USD"}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none z-50",
          })
        }
      >
        {options.map(({ icon, label }) => (
          <Option key={label} value={label} className="flex items-center gap-2 z-50">
            {label}
            <span className="text-md z-50">{icon}</span>
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectCurrency;
