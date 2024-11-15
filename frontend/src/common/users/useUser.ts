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
    skip: !accessToken || !refreshToken,
  });

  useEffect(() => {
    const existTokens = accessToken && refreshToken;

    if (existTokens && !isLoggedIn) {
      refetch()
        .then(({ data }) => {
          if (data) {
            dispatch(setIsLoggedIn({ isLoggedIn: true, user: data }));
          } else {
            dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
          }
        })
        .catch(() => {
          dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
        });
    }
  }, [dispatch, isLoggedIn, refetch, user, accessToken, refreshToken]);

  if (user !== null) {
    console.log(user, "stan uzytkownika");
  }

  return { user, isLoggedIn };
};

export default useUser;
