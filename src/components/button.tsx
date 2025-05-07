import { ButtonProps } from "@/@types/components";
import { useState, MouseEvent } from "react";

export default function Button({
  title,
  variant = "solid",
  className = "",
  onPress,
  isDisabled = false,
  isSolidEffect = false,
  isOutlineEffect = false,
  ...props
}: ButtonProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onPress) {
      onPress();
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    setTimeout(() => setRipple(null), 200);
  };

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`${className} my-1 ursor-pointer relative overflow-hidden px-6 py-1 rounded-lg font-medium transition-all duration-300
        ${
          isSolidEffect
            ? "bg-[var(--primary-color)] text-white hover:bg-transparent hover:text-[var(--primary-color)] hover:border-2 hover:border-[var(--primary-color)]"
            : isOutlineEffect
            ? "border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
            : variant === "solid"
            ? "bg-[var(--primary-color)] text-white hover:bg-[#2c4c7b] active:scale-95"
            : "border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white active:scale-95"
        } `}
      onClick={handleClick}
      {...props}
    >
      {title}

      {ripple && (
        <span
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: "150px",
            height: "150px",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </button>
  );
}
