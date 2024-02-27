import { Typography } from "@material-tailwind/react";
import { getUsersWithRoles } from "../utils/dbProvider";
import { useLoaderData } from "react-router-dom";

export default function UsersPage() {
  const users = useLoaderData();

  return (
    <div className="m-10">
      <Typography variant="h1">Users</Typography>
      {users.map(({ uid, email, role }) => (
        <div key={uid} className="flex items-center justify-between">
          <Typography variant="h4">{email}</Typography>
          <Typography variant="h4">{role}</Typography>
        </div>
      ))}
    </div>
  );
}

export const loader = async () => {
  return await getUsersWithRoles();
};
