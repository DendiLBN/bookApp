import { selectIsLoggedIn } from "@/store/reducers/user";
import { useSelector } from "react-redux";

export const useIsLoggedIn = (): boolean => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn;
};
