import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUsersQuery } from "@/store/api/users";
import {
  selectIsLoggedIn,
  selectUser,
  setIsLoggedIn,
} from "@/store/reducers/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../consts/local-storage";

const useUser = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const user = useSelector(selectUser);

  const { refetch } = useFetchUsersQuery();

  useEffect(() => {
    const existTokens =
      localStorage.getItem(ACCESS_TOKEN) && localStorage.getItem(REFRESH_TOKEN);

    if (isLoggedIn && existTokens && !user) {
      refetch().then(({ data }) => {
        if (data) {
          dispatch(setIsLoggedIn({ isLoggedIn: true, user: data }));
        }
      });
    }
  }, [dispatch, isLoggedIn, refetch, user]);

  console.log(user);

  // TODO ONLY IF USER WILL LOG IN TRIGGER GET ME FROM QUERY

  return { user, userId: user?._id };
};
export default useUser;
