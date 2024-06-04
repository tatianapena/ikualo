import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";
import axios from "axios";

import DefaultLayout from "@/layouts/default";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/transaction";
    }
  }, [isAuthenticated]);

  const handlerSubmit = async () => {
    let users;

    try {
      users = await axios({
        method: "POST",
        baseURL: "http://localhost:3000/auth/login",
        data: {
          email,
          password,
        },
      });
      if (users.status === 201) {
        setIsAuthenticated(true);
        localStorage.setItem("userId", JSON.parse(users.config.data).email);
      } else {
        alert("wrong password or email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col justify-around">
        <Avatar
          className="w-64 h-64 text-tiny mx-auto my-5"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <Input
          className="my-5"
          label="Email"
          placeholder="Enter your email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="my-5"
          label="password"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="mx-auto my-5"
          color="primary"
          onClick={() => {
            handlerSubmit();
          }}
        >
          Log In
        </Button>
      </div>
    </DefaultLayout>
  );
}
