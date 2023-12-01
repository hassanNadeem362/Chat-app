import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formdata, setData] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const HandleForm = (e) => {
    const { value, name } = e.target;
    setData({ ...formdata, [name]: value });
  };

  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      if (!formdata.email || !formdata.password) {
        toast({
          title: "Please enter all fields!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

      setLoading(false);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        formdata,
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setShow(!show);
  };

  const setGuestCredentials = () => {
    // Update the state with guest user credentials
    setData({
      email: "guest@example.com",
      password: "123456",
    });
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          name="email"
          value={formdata.email}
          onChange={HandleForm}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            name="password"
            value={formdata.password}
            onChange={HandleForm}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={setGuestCredentials}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
