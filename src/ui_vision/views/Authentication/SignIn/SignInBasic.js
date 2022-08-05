/*!

=========================================================
* Vision UI PRO Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
// Chakra imports
import {
  Box,
  Button,
  DarkMode,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
} from "@chakra-ui/react";

// Assets
import basic from "../../../assets/img/basic-auth.png";

// Custom components
import GradientBorder from "../../../components/GradientBorder/GradientBorder";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

import { LogInScreen } from '../../../../screens/LogInScreen'

// Footer
import Footer from "../../../components/Footer/Footer";

function SignInBasic() {
  const titleColor = "white";
  const textColor = "gray.400";
  return (
   
    <Flex
      direction='row'
      alignSelf='center'
      justifySelf='center'
    
   
      w='100%'
      p='80px'
      >

      <Flex
        alignItems='center'
        justifyContent='start'
        style={{ userSelect: "none" }}
        flexDirection='column'
        mx={{ base: "auto" }}
        mb={{ base: "0px", md: "50px" }}
        w='100%'
 
       >

        <GradientBorder
          p='2px'
          me={{ base: "none", lg: "30px", xl: "none" }}
          mb={{ base: "50px", lg: "150px" }}>
          <Flex
            background='transparent'
            borderRadius='30px'
            direction='column'
            p='40px'
            minW={{ base: "unset", md: "430px", xl: "450px" }}
            w='100%'
            h='600px'         
            mx={{ base: "0px" }}
            bg={{
              base: "rgb(19,21,56)",
            }}>
               {LogInScreen()}


          </Flex>
        </GradientBorder>
      </Flex>

    </Flex>
  );
}

export default SignInBasic;
