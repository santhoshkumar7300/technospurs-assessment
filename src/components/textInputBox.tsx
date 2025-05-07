import { TextAreaBoxProps, TextInputBoxProps } from "../@types/components";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import StyledText from "./styledText";

const TextInputBox = ({
  title,
  value,
  isRequired,
  onChangeText,
  type = "text",
  errorText,
  placeholder,
  isSecureText = false,
  leftIcon,
  rightIcon,
  className = "",
  options = [],
  onOptionSelect,
  optionLabel,
  getOptionLabel = (option) =>
    typeof option === "string" ? option : option[optionLabel ?? ""],
  ...props
}: TextInputBoxProps) => {
  const [isShowPassword, setisShowPassword] = useState<boolean>(false);
  const [isOpenOptions, setisOpenOptions] = useState<boolean>(false);

  useEffect(() => {
    if (options.length > 0) {
      setisOpenOptions(true);
    }
  }, [options]);

  return (
    <div className={`flex flex-col gap-2 my-3 ${className}`}>
      {title && (
        <label className="text-gray-700">
          {title}{" "}
          {isRequired && (
            <StyledText as="span" className="text-[var(--error-text-color)]">
              *
            </StyledText>
          )}
        </label>
      )}
      <div className="relative bg-[var(--white-color)] rounded-md">
        {leftIcon && (
          <StyledText
            as="span"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          >
            {leftIcon}
          </StyledText>
        )}
        <input
          type={isSecureText && !isShowPassword ? "password" : type}
          value={value}
          onChange={(e) => {
            if (onChangeText) {
              onChangeText(e.target.value);
            }
          }}
          placeholder={placeholder ?? `Enter your ${title}`}
          className={`w-full p-2 border-1 rounded-md text-gray-900 transition-all duration-300 focus:outline-none ${
            errorText ? "border-[var(--error-text-color)]" : "border-gray-300"
          } ${leftIcon ? "pl-10" : ""} ${
            isSecureText || rightIcon ? "pr-10" : ""
          }`}
          {...props}
        />
        {isSecureText ? (
          <button
            type="button"
            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setisShowPassword((prev) => !prev)}
          >
            {isShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        ) : (
          rightIcon && (
            <StyledText
              as="span"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {rightIcon}
            </StyledText>
          )
        )}
        {options.length > 0 && isOpenOptions && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (onOptionSelect) {
                    onOptionSelect(option);
                  }
                  setisOpenOptions(false);
                }}
              >
                {getOptionLabel(option)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {errorText && (
        <StyledText
          as="span"
          className="text-[var(--error-text-color)] text-sm transition-opacity duration-300"
        >
          {errorText.toString()}
        </StyledText>
      )}
    </div>
  );
};

TextInputBox.Area = ({
  title,
  value,
  isRequired,
  onChangeText,
  errorText,
  placeholder,
  className = "",
  ...props
}: TextAreaBoxProps) => {
  return (
    <div className={`flex flex-col gap-1 my-3 ${className}`}>
      {title && (
        <label className="text-gray-700">
          {title}{" "}
          {isRequired && (
            <StyledText as="span" className="text-[var(--error-text-color)]">
              *
            </StyledText>
          )}
        </label>
      )}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (onChangeText) {
              onChangeText(e.target.value);
            }
          }}
          placeholder={placeholder ?? `Enter your ${title}`}
          className={`w-full p-2 border rounded-md text-gray-900 transition-all duration-300 focus:outline-none resize-none ${
            errorText ? "border-[var(--error-text-color)]" : "border-gray-300"
          }`}
          {...props}
        />
      </div>
      {errorText && (
        <StyledText
          as="span"
          className="text-[var(--error-text-color)] text-sm transition-opacity duration-300"
        >
          {errorText.toString()}
        </StyledText>
      )}
    </div>
  );
};

export default TextInputBox;
