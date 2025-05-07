import { StyledTextProps } from "../@types/components";
import { FC, useState } from "react";

const StyledText: FC<StyledTextProps> = ({
  as = "p",
  children,
  readMore = false,
  maxLength = 100,
  className = "",
  ...props
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const shouldTruncate =
    readMore && typeof children === "string" && children.length > maxLength;
  const displayedText =
    shouldTruncate && !expanded
      ? children.slice(0, maxLength) + "..."
      : children;

  const Component = as;

  return (
    <Component className={`font-regular text-md  ${className}`} {...props}>
      {displayedText}
      {shouldTruncate && (
        <span
          className="read-more text-blue-500 cursor-pointer"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? " Read Less" : " Read More"}
        </span>
      )}
    </Component>
  );
};

export default StyledText;
