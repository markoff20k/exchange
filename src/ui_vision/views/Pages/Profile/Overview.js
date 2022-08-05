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

import React, { useReducer, useState } from "react";
import { useSelector } from 'react-redux';
import { Element, Link } from "react-scroll";
import Container from 'react-bootstrap/Container';

// Chakra imports
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  DarkMode,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Select,
  Stack,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  usePrevious,
} from "@chakra-ui/react";
import * as GradientProgress from "@delowar/react-circle-progressbar";
import avatar11 from "../../../../assets/images/profile/avatar.svg";

// Assets
import avatar2 from "../../../assets/img/avatars/avatar2.png";
import avatar3 from "../../../assets/img/avatars/avatar3.png";
import avatar4 from "../../../assets/img/avatars/avatar4.png";
import avatar6 from "../../../assets/img/avatars/avatar6.png";
import bgProfile from "../../../assets/img/bgProfile.png";
import ProjectImage1 from "../../../assets/img/ProjectImage1.png";
import ProjectImage2 from "../../../assets/img/ProjectImage2.png";
import ProjectImage3 from "../../../assets/img/ProjectImage3.png";

// Custom components
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import LineChart from "../../../components/Charts/LineChart";
import IconBox from "../../../components/Icons/IconBox";
import { HSeparator } from "../../../components/Separator/Separator";


// Icons
import {
  CarIcon,
  LightningIcon,
  LightningWhiteIcon,
} from "../../../components/Icons/Icons";
import { BsArrowRight } from "react-icons/bs";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPencilAlt,
  FaPenFancy,
  FaTwitter,
} from "react-icons/fa";
//import { IoDocumentsSharp } from "react-icons/io5";

// Data
import {
  lineChartDataProfile1,
  lineChartDataProfile2,
  lineChartOptionsProfile1,
  lineChartOptionsProfile2,
} from "../../../variables/charts";

import { selectUserActivity, selectUserInfo } from 'modules';
import { ProfileAccountActivity, ProfileActiveStep, ProfileAuthDetails, Profile2FA, ProfileAnnouncement, ProfileApiKeys, ProfileTwoFactorAuth, ProfileSecurity, ProfileVerification, ProfileVerificationLabels } from 'containers';
import { localeDate, setDocumentTitle } from 'helpers';

import { WalletListScreen } from 'screens';

// This reducer changes the active button based on the current state



const reducer = (state, action) => {
  if (action.type === "SWITCH_ACTIVE") {
    if (action.payload === "overview") {
      const newState = {
        overview: true,
        teams: false,
        projects: false,
      };
      return newState;
    } else if (action.payload === "teams") {
      const newState = {
        overview: false,
        teams: true,
        projects: false,
      };
      return newState;
    } else if (action.payload === "projects") {
      const newState = {
        overview: false,
        teams: false,
        projects: true,
      };
      return newState;
    }
  }
  return state;
};




const GetUserEmail = () => {
	const userActivity = useSelector(selectUserActivity);
	const user = useSelector(selectUserInfo);

	const lastLogin = userActivity.find(act => act.action === 'login');
	const ip = lastLogin ? lastLogin.user_ip : '';
	const time = lastLogin ? localeDate(lastLogin.created_at, 'fullDate') : '';

	return (<React.Fragment>{user.email}</React.Fragment>);
}

const GetUserID = () => {
	const userActivity = useSelector(selectUserActivity);
	const user = useSelector(selectUserInfo);

	const lastLogin = userActivity.find(act => act.action === 'login');
	const ip = lastLogin ? lastLogin.user_ip : '';
	const time = lastLogin ? localeDate(lastLogin.created_at, 'fullDate') : '';
  
	return (<React.Fragment>{user.uid}</React.Fragment>);
}

const GetUserLoginInformation = () => {
	const userActivity = useSelector(selectUserActivity);

	const lastLogin = userActivity.find(act => act.action === 'login');
	const ip = lastLogin ? lastLogin.user_ip : '';
	const time = lastLogin ? localeDate(lastLogin.created_at, 'fullDate') : '';

	return (
		
						<div>
							<span>Útimo login: {time} </span>
							<span>IP : {ip} </span>
						</div>
	
	);
};



function Profile() {
  // Chakra color mode
  const [state, dispatch] = useReducer(reducer, {
    overview: true,
    teams: false,
    projects: false,
  });


  return (
    
    <Flex direction='column' pt={{ sm: "120px", md: "75px" }}>
            <Box
        mb={{ sm: "24px", md: "50px", xl: "20px" }}
        borderRadius='15px'
        px='0px'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        align='center'>
        {/* Header */}
        <Card
          direction={{ sm: "column", md: "row" }}
          mx='auto'
          maxH='330px'
          w={{ sm: "90%", xl: "100%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          p='24px'
          borderRadius='20px'>
          <Flex align='center' direction={{ sm: "column", md: "row" }}>
            <Flex
              align='center'
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}>
              <Avatar
                me={{ md: "22px" }}
                //src={avatar11}
                w='80px'
                h='80px'
                borderRadius='15px'>
                <AvatarBadge
                  cursor='pointer'
                  borderRadius='8px'
                  border='transparent'
                  bg='linear-gradient(138.78deg, rgba(6, 11, 40, 0.94) 17.44%, rgba(10, 14, 35, 0.49) 93.55%, rgba(10, 14, 35, 0.69) 93.55%)'
                  boxSize='26px'
                  backdropFilter='blur(120px)'>
                  <Icon h='12px' w='12px' color='#fff' as={FaPencilAlt} />
                </AvatarBadge>
              </Avatar>
              <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
                <Text
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color='#fff'
                  fontWeight='bold'
                  ms={{ sm: "8px", md: "0px" }}>
                  Jeferson Martin
                </Text>
                <Text fontSize={{ sm: "sm", md: "md" }} color='gray.400'>
                  ID: {GetUserID()}
                </Text>
                <Text fontSize={{ sm: "sm", md: "md" }} color='gray.400'>
                  {GetUserLoginInformation()}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={{ sm: "column", lg: "row" }}
              w={{ sm: "100%", md: "50%", lg: "auto" }}>
              <Button
                borderRadius='12px'
                transition='background .3s ease'
                bg={state.overview ? "brand.200" : "transparent"}
                _hover={{
                  bg: "brand.200",
                }}
                _active={{
                  bg: "brand.200",
                }}
                me={{ base: "none", lg: "20px" }}
                leftIcon={<Icon color='white' as={FaCube} me='6px' />}
                onClick={() =>
                  dispatch({ type: "SWITCH_ACTIVE", payload: "overview" })
                }
                minW='135px'>
                <Text fontSize='xs' color='#fff' fontWeight='bold'>
                  Informações Pessoais
                </Text>
              </Button>
              <Button
                borderRadius='12px'
                transition='background .3s ease'
                bg={state.teams ? "brand.200" : "transparent"}
                _hover={{
                  bg: "brand.200",
                }}
                _active={{
                  bg: "brand.200",
                }}
                me={{ base: "none", lg: "20px" }}
                leftIcon={<Icon color='white' as={FaPenFancy} me='6px' />}
                onClick={() =>
                  dispatch({ type: "SWITCH_ACTIVE", payload: "teams" })
                }
                minW='135px'>
                <Text fontSize='xs' color='#fff' fontWeight='bold'>
                  Limites de Operação
                </Text>
              </Button>
              <Button
                borderRadius='12px'
                transition='background .3s ease'
                bg={state.projects ? "brand.200" : "transparent"}
                _hover={{
                  bg: "brand.200",
                }}
                _active={{
                  bg: "brand.200",
                }}
                leftIcon={<Icon color='white' as={FaPenFancy} me='6px' />}
                onClick={() =>
                  dispatch({ type: "SWITCH_ACTIVE", payload: "projects" })
                }
                minW='135px'>
                <Text fontSize='xs' color='#fff' fontWeight='bold'>
                  Segurança
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
      
      <Grid
        templateColumns={{
          sm: "1fr",
          xl: "repeat(2, 1fr)",
          "2xl": "1fr 2fr 1.2fr",
        }}
        gap='10px'
        mb='12px'>
    
        
        {/* Dados Pessoais */}
        <Card
          p='16px'
          maxH={{ md: "410px" }}
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          //bgImage={bgProfile}
          bgSize='cover'
          gridArea={{ xl: "1 / 2 / 2 / 3", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Dados Pessoais
            </Text>
          </CardHeader>
          <CardBody px='5px'>
            <Flex direction='column'>

              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Nome:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  Jeferson Martin
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  CPF:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  27825987837
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Data de nascimento:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  27/11/1979
                </Text>
              </Flex>                                
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Telefone:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  (55) (11) 99279-9895
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Email: 
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                {GetUserEmail()}
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Nacionalidade:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  Brasileiro
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Redes Sociais:{" "}
                </Text>
                <Flex>
                  <Link
                    href='#'
                    color='teal.300'
                    fontSize='lg'
                    me='10px'
                    _hover={{ color: "teal.300" }}>
                    <Icon color='white' as={FaFacebook} w='12px' h='12px' />
                  </Link>
                  <Link
                    href='#'
                    color='teal.300'
                    fontSize='lg'
                    me='10px'
                    _hover={{ color: "teal.300" }}>
                    <Icon color='white' as={FaInstagram} w='12px' h='12px' />
                  </Link>
                  <Link
                    href='#'
                    color='teal.300'
                    fontSize='lg'
                    me='10px'
                    _hover={{ color: "teal.300" }}>
                    <Icon color='white' as={FaTwitter} w='12px' h='12px' />
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
          {/* Account Status */}
          <Card
            p='16px'
            maxH={{ lg: "410px" }}
            maxW={{ sm: "325px", md: "725px", lg: "980px", xl: "100%" }}
            w='100%'
            gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}>
            <CardHeader p='12px 5px' mb='12px'>
              <Text fontSize='lg' color='#fff' fontWeight='bold'>
                Status da Conta
              </Text>
            </CardHeader>
            <Grid w='100%'>
              <Flex w='100%' direction={{ sm: "column", md: "row" }}>
        				<ProfileActiveStep />
              </Flex>

            </Grid>
          </Card>
          
        {/* Profile Verification */}
          <Card
            p='16px'
            h='400px'
            w='100%'
            maxH={{ lg: "410px" }}
            maxW={{ sm: "325px", md: "725px", lg: "980px", xl: "100%" }}
            gridArea={{ xl: "2 / 1 / 3 / 3", "2xl": "auto" }}>
            <CardHeader p='12px 5px' mb='12px'>
              <Text fontSize='lg' color='#fff' fontWeight='bold'>
                Limites Operacionais
              </Text>
            </CardHeader>
            <Grid w='100%' >
            <Flex w='100%'  h='100%' direction={{ sm: "column", md: "row" }}>
              <ProfileVerification />   
            </Flex>
            <CardBody>
              <ProfileVerificationLabels />
            </CardBody>
            </Grid>
          </Card>
      </Grid>

      <Grid
        templateColumns={{
          sm: "1fr",
          xl: "repeat(2, 1fr)",
          "2xl": "1fr 2fr 1.2fr",
        }}
        gap='10px'
        mb='12px'>

        {/* Welcome Card */}
        <Card
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          h={{ sm: "270px", lg: "350px", xl: "410px" }}
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Segurança
            </Text>
          </CardHeader>
          <Flex direction='column' h='400px'>
            <ProfileSecurity/>
          </Flex>
        </Card>
        <Card
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          h={{ sm: "270px", lg: "350px", xl: "410px" }}
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Gerenciamento de API
            </Text>
          </CardHeader>
          <Flex direction='column' h='400px'>
            <ProfileApiKeys />
          </Flex>
        </Card>


        {/* Profile Information */}
        <Card
          p='16px'
          maxH={{ md: "410px" }}
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          gridArea={{ xl: "1 / 2 / 2 / 3", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Últimas atividades
            </Text>
          </CardHeader>
          <CardBody px='5px' w='100%'>
              <Flex direction='row'>
                <Text fontSize='10px' color={"gray.400"} mb='20px'>
                <ProfileAccountActivity/>
                </Text>

              </Flex>
            </CardBody>
        </Card>
      </Grid>


    </Flex>
  );
}

export default Profile;
