import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/reducers/users";
import { useFetchUsersQuery } from "@/store/api/users";

const useUser = () => {
  const { data: user, error, refetch } = useFetchUsersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
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
