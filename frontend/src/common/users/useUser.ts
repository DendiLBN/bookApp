import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUsersQuery } from "@/store/api/users";
import { selectUser, setIsLoggedIn } from "@/store/reducers/auth";
import { ACCESS_TOKEN } from "../consts/local-storage";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { refetch } = useFetchUsersQuery();
  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      refetch().then(({ data }) => {
        if (data) {
          dispatch(setIsLoggedIn({ isLoggedIn: true, user: data }));
        } else {
          dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
        }
      });
    }
  }, [dispatch, refetch]);

  return { user, userId: user?._id };
};

export default useUser;
