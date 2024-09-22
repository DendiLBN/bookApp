import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "@/common/store/reducers/user";

// TODO LOGGED USER HOOK

export const useIsLoggedIn = (): boolean => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn;
};
