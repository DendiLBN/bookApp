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

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  const { refetch } = useFetchUsersQuery(undefined, {
    skip: !accessToken || !refreshToken || isLoggedIn,
  });

  useEffect(() => {
    const existTokens = accessToken && refreshToken;

    if (existTokens && !user) {
      refetch().then(({ data }) => {
        if (data) {
          dispatch(setIsLoggedIn({ isLoggedIn: true, user: data }));
        } else {
          dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
        }
      });
    }
  }, [dispatch, isLoggedIn, refetch, user, accessToken, refreshToken]);

  return { user };
};

export default useUser;
