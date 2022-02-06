import User from "./User";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect, useContext } from "react";

const AllUsersPage = () => {
  let navigate = useNavigate();
  const AuthValues = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      if (!AuthValues.token) {
        AuthValues.setIsLoggedIn(false);
        navigate("/user/login");
        return;
      }

      const res = await fetch("http://localhost:3000/admin/allUsers", {
        method: "GET",
        headers: { Authorization: `Bearer ${AuthValues.token}` },
      });

      const users = await res.json();

      setAllUsers(users);
    };

    getAllUsers();
  }, [AuthValues.token]);

  const mapAllUsers = allUsers.map(
    (user) =>
      !user.role && (
        <User
          key={user.id}
          id={user.id}
          email={user.email}
          active={user.active}
        ></User>
      )
  );

  return <>{mapAllUsers}</>;
};

export default AllUsersPage;
