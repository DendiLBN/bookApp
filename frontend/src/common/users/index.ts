import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@/store/reducers/users";
import { useFetchUsersQuery } from "@/store/api/users";
import { selectIsLoggedIn } from "@/store/reducers/auth";

const useUser = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    data: user,
    error,
    refetch,
  } = useFetchUsersQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    console.log("User:", user);
    if (user) {
      dispatch(setUser(user));
    } else if (error) {
      dispatch(clearUser());
    }
  }, [user, error, dispatch]);

  return {
    user,
    userId: user?._id,
    refetchUser: refetch,
  };
};

export default useUser;
