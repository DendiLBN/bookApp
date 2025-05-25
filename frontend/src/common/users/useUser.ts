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
  console.log("user", user);
  console.log("isLoggedIn", isLoggedIn);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  const { refetch } = useFetchUsersQuery(undefined, {
    skip: !accessToken || !refreshToken,
  });

  useEffect(() => {
    if (accessToken && refreshToken && !user) {
      refetch()
        .then(({ data }) => {
          dispatch(setIsLoggedIn({ isLoggedIn: !!data, user: data ?? null }));
        })
        .catch(() => {
          dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
        });
    }
  }, [accessToken, refreshToken, dispatch, refetch, user]);

  return { user, isLoggedIn };
};

export default useUser;
