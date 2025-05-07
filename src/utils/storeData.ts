import { useSelector } from "react-redux";

export const useUserListData = () => {
  return useSelector((state: any) => state.user.usersList);
};
