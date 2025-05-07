import { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import StyledText from "./styledText";
import { OptionType, SelectProps } from "../@types/components";

const Select = <T extends OptionType>({
  options,
  value,
  onChange,
  isMulti = false,
  isSearchable = false,
  isClearable = false,
  placeholder = "Select...",
  getOptionLabel = (option) => option?.label ?? "",
  getOptionValue = (option) => option?.value,
  menuPlacement = "bottom",
  className = "",
  errorText = "",
  title,
  isRequired = false,
  inputContainerStyle,
  isCreate = false,
  onCreateOption,
  createLabel = "Create",
  rightTitleText = "",
  onRightTitleText,
  isDisabled = false,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => setIsOpen(false);

  const isSelected = (opt: T): boolean => {
    if (!value) return false;
    if (isMulti && Array.isArray(value)) {
      return value.some((v) => getOptionValue(v) === getOptionValue(opt));
    }
    return getOptionValue(value as T) === getOptionValue(opt);
  };

  const handleSelect = (opt: T) => {
    if (isMulti) {
      const currentValue: T[] = Array.isArray(value) ? [...value] : [];
      const alreadySelected = currentValue.some(
        (v) => getOptionValue(v) === getOptionValue(opt)
      );

      const newValue = alreadySelected
        ? currentValue.filter((v) => getOptionValue(v) !== getOptionValue(opt))
        : [...currentValue, opt];

      onChange(newValue.length > 0 ? newValue : null);
    } else {
      onChange(opt);
      closeDropdown();
    }
  };

  const handleClear = () => {
    onChange(null);
    setSearch("");
  };

  const handleRemoveTag = (opt: T, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMulti && Array.isArray(value)) {
      const updated = value.filter(
        (v) => getOptionValue(v) !== getOptionValue(opt)
      );
      onChange(updated.length > 0 ? updated : null);
    }
  };

  const filteredOptions = options.filter((opt) =>
    getOptionLabel(opt)?.toLowerCase().includes(search?.toLowerCase())
  );

  const showCreateOption =
    isCreate &&
    search.trim() !== "" &&
    !options.some(
      (opt) =>
        getOptionLabel(opt)?.toLowerCase() === search?.trim()?.toLowerCase()
    );

  const handleCreateOption = () => {
    const newOption = onCreateOption
      ? onCreateOption(search.trim())
      : ({
          label: search.trim(),
          value: search.trim().toLowerCase().replace(/\s+/g, "-"),
        } as unknown as T);

    handleSelect(newOption);
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDropdownPosition = () => {
    switch (menuPlacement) {
      case "top":
        return "bottom-full mb-2";
      case "left":
        return "right-full mr-2";
      case "right":
        return "left-full ml-2";
      case "bottom":
      default:
        return "top-full mt-2";
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative flex flex-col gap-2 my-3 w-full ${className}`}
    >
      {(title || rightTitleText) && (
        <div className="flex items-center justify-between">
          <label className="text-gray-700">
            {title}
            {isRequired && (
              <StyledText as="span" className="text-[var(--error-text-color)]">
                *
              </StyledText>
            )}
          </label>

          {rightTitleText && (
            <StyledText
              onClick={onRightTitleText}
              className={`text-sm text-blue-500 ${
                onRightTitleText && "cursor-pointer"
              }`}
            >
              {rightTitleText}
            </StyledText>
          )}
        </div>
      )}
      <div
        className={`flex items-center flex-wrap gap-2 px-4 py-2 min-h-[42px] border rounded-lg bg-white cursor-pointer transition-all duration-200
          ${
            isOpen && !errorText
              ? "border-[var(--primary-color)]"
              : errorText
              ? "border-[var(--error-text-color)]"
              : "border-gray-300"
          }
          focus:outline-none focus:ring-0 ${inputContainerStyle}`}
        onClick={() => {
          if (!isDisabled) {
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <div className="flex flex-wrap gap-2 flex-1">
          {isMulti && Array.isArray(value) && value.length > 0 ? (
            value.map((val, ind) =>
              val ? (
                <div
                  key={`${getOptionValue(val)}-${ind}`}
                  className="flex items-center gap-1 bg-[var(--light-primary-color)] rounded-full px-2 py-1 text-sm text-gray-800"
                >
                  {getOptionLabel(val)}
                  <button
                    onClick={(e) => handleRemoveTag(val, e)}
                    className="ml-1 text-gray-600 cursor-pointer hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : null
            )
          ) : !isMulti && value ? (
            <span className="truncate text-sm text-gray-800">
              {getOptionLabel(value as T)}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isClearable && value && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="hover:text-red-500 cursor-pointer transition"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            size={18}
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {errorText && !isOpen && (
        <StyledText
          as="span"
          className="text-[var(--error-text-color)] text-sm transition-opacity duration-300"
        >
          {errorText.toString()}
        </StyledText>
      )}

      {isOpen && (
        <div
          className={`absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto text-sm ${getDropdownPosition()}`}
        >
          {isSearchable && (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 border-b border-gray-200 outline-none text-sm"
            />
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, ind) => (
              <div
                key={`${getOptionValue(opt)}-${ind}`}
                onClick={() => handleSelect(opt)}
                className={`px-4 py-3 cursor-pointer transition-all duration-150 ${
                  isSelected(opt)
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                {getOptionLabel(opt)}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-400">No options</div>
          )}

          {showCreateOption && (
            <div
              onClick={handleCreateOption}
              className="px-4 py-3 cursor-pointer flex items-center gap-2 text-blue-600 hover:bg-blue-50"
            >
              {`${createLabel} "${search.trim()}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
