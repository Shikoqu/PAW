import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

export function CommentCard({ user, text }) {
  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        {user.photoURL ? (
          <Avatar
            variant="circular"
            size="lg"
            alt={user.displayName ?? user.email}
            className="border border-gray-900 p-0.5"
            src={user.photoURL}
          />
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {user.displayName ?? user.email}
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>{text}</Typography>
      </CardBody>
    </Card>
  );
}
