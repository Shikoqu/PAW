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

import { signup, emailRegex } from "../utils/authProvider";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  const $signup = async (e) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirm) {
      return setError("Please fill in all fields");
    }
    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    if (await signup({ email, password })) {
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
          <Typography variant="h4">Sign Up</Typography>
          <Typography className="mt-1 font-normal">
            Nice to meet you! Enter your details to sign up.
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
              id="password1"
              label="Password"
              type="password"
            />
            <Input
              onChange={(e) => setpasswordConfirm(e.target.value)}
              required
              id="password2"
              label="Confirm Password"
              type="password"
            />
            <Button onClick={$signup} fullWidth className="mt-6">
              Sign Up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="../signin" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Signup;
