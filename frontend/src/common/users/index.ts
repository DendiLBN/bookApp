import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, clearUser } from "@/store/reducers/users";
import { useFetchUsersQuery } from "@/store/api/users";

const useFetchUser = () => {
  const { data: userData, error, refetch } = useFetchUsersQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    } else if (error) {
      dispatch(clearUser());
      navigate("/login");
    }
  }, [userData, error, dispatch, navigate]);

  return { user: userData, refetchUser: refetch };
};

export default useFetchUser;
