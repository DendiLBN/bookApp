import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "@/common/store/reducers/user";

export const useIsLoggedIn = (): boolean => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn;
};
