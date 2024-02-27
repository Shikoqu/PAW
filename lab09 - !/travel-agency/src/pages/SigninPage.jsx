import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { signin, emailRegex } from "../utils/authProvider";

function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const $signin = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }

    if (await signin({ email, password })) {
      navigate("../..");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-[24rem]">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >
          <Typography variant="h4">Sign In</Typography>
          <Typography className="mt-1 font-normal">
            Welcome back! Enter your details to sign in.
          </Typography>
        </CardHeader>
        <CardBody>
          {error ? (
            <Typography color="red">{error}</Typography>
          ) : (
            <Typography color="white">.</Typography>
          )}
          <form className="mt-12 flex flex-col gap-4">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              label="Email"
              type="email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              label="Password"
              type="password"
            />
            <Button onClick={$signin} fullWidth className="mt-6">
              Sign In
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Dont have account yet?{" "}
              <Link to="../signup" className="font-medium text-gray-900">
                Sign Up
              </Link>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Signin;
