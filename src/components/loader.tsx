import { LoaderProps } from "../@types/components";
import StyledText from "./styledText";

const Loader: React.FC<LoaderProps> = ({ isVisible, text }) => {
  return isVisible ? (
    <div className="fixed top-0 left-0 w-full h-screen z-[1] bg-[var(--dim-color)] flex flex-col justify-center items-center">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-6"></div>

      {text && (
        <StyledText className="text-[var(--white-color)] text-center">
          {text}
        </StyledText>
      )}
    </div>
  ) : null;
};

export default Loader;
