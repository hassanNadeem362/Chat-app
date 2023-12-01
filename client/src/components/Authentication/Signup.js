import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [formdata, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    pic: "",
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    if (!file) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (file.type === "image/jpeg" || file.type === "image/png") {
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dfdr1uvxz");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dfdr1uvxz/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const response = await res.json();
        setData({ ...formdata, pic: response.secure_url });
        setLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
      }
    }
  };

  const HandleForm = (e) => {
    const { value, name } = e.target;
    setData({ ...formdata, [name]: value });
  };

  const submitHandler = async () => {
    try {
      if (formdata.password !== formdata.confirmpassword) {
        toast({
          title: "Password not match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } 
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data} = await axios.post(
        "http://localhost:5000/api/user/register",
        formdata,
        config
      );
      toast({
        title: "Registeration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate("/chats")
    } catch (error) {
      console.log(error);
    }
  };

 

  const handleClick = () => {
    setShow(!show);
  };

  console.log(formdata.pic);
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          value={formdata.name}
          onChange={HandleForm}
        />
      </FormControl>
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

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmpassword"
            value={formdata.confirmpassword}
            onChange={HandleForm}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        {/* <img src={formdata.pic} alt="" /> */}
        <FormLabel>Upload youe Picture</FormLabel>
        <Input
          type="file"
          name="pic"
          accept="image/*"
          onChange={handleImageChange}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
