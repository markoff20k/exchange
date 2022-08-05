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

import React, { useReducer } from "react";
import { useSelector } from 'react-redux';
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
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  Switch,
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
import { ProfileAccountActivity, ProfileActiveStep, ProfileAuthDetails, Profile2FA, ProfileAnnouncement, ProfileApiKeys, ProfileTwoFactorAuth, ProfileSecurity, ProfileVerification } from 'containers';
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
							<span>Last login time: {time} </span>
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
      <Grid
        templateColumns={{
          sm: "1fr",
          xl: "repeat(2, 1fr)",
          "2xl": "1fr 2fr 1.2fr",
        }}
        gap='10px'
        mb='12px'>
        {/* Profile Informations */}
        <Card
          p='16px'
          maxH={{ md: "410px" }}
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          bgImage={bgProfile}
          bgSize='cover'
          gridArea={{ xl: "1 / 2 / 2 / 3", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px='5px'>
            <Flex direction='column'>
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
                  fontSize='lg' color='#fff' fontWeight='bold'>
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
          </Flex>
              <HSeparator mb='30px' />
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Full Name:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  Jeferson Martin
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Mobile:{" "}
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
                  Location:{" "}
                </Text>
                <Text fontSize='sm' color='#fff' fontWeight='400'>
                  Brazil
                </Text>
              </Flex>
              <Flex align='center' mb='18px'>
                <Text fontSize='sm' color={"gray.400"} me='10px'>
                  Social Media:{" "}
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
                Account Status
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
                Profile Verification
              </Text>
            </CardHeader>
            <Grid w='100%' >
            <Flex w='100%'  h='100%' direction={{ sm: "column", md: "row" }}>
              <ProfileVerification />   
                
              </Flex>
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
              Security
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
              My API Keys
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
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px='5px'>
              <Flex direction='column'>
                <Text fontSize='10px' color={"gray.400"} mb='20px'>
                  ACCOUNT
                </Text>
                <Flex align='center' mb='20px'>
                  <DarkMode>
                    <Switch colorScheme='brand' me='10px' defaultChecked />
                  </DarkMode>
                  <Text
                    noOfLines={1}
                    fontSize='sm'
                    color={"gray.400"}
                    fontWeight='400'>
                    Email me when someone follows me
                  </Text>
                </Flex>
                <Flex align='center' mb='20px'>
                  <DarkMode>
                    <Switch colorScheme='brand' me='10px' defaultChecked />
                  </DarkMode>
                  <Text
                    noOfLines={1}
                    fontSize='sm'
                    color={"gray.400"}
                    fontWeight='400'>
                    Email me when someone answers on my post
                  </Text>
                </Flex>
                <Flex align='center' mb='20px'>
                  <DarkMode>
                    <Switch colorScheme='brand' me='10px' defaultChecked />
                  </DarkMode>
                  <Text
                    noOfLines={1}
                    fontSize='sm'
                    color={"gray.400"}
                    fontWeight='400'>
                    Email me when someone mentions me
                  </Text>
                </Flex>
                <Text fontSize='10px' color={"gray.400"} m='6px 0px 20px 0px'>
                  APPLICATION
                </Text>
                <Flex align='center' mb='20px'>
                  <DarkMode>
                    <Switch colorScheme='brand' me='10px' />
                  </DarkMode>
                  <Text
                    noOfLines={1}
                    fontSize='sm'
                    color={"gray.400"}
                    fontWeight='400'>
                    New launches and projects
                  </Text>
                </Flex>
                <Flex align='center' mb='20px'>
                  <DarkMode>
                    <Switch colorScheme='brand' me='10px' defaultChecked />
                  </DarkMode>
                  <Text
                    noOfLines={1}
                    fontSize='sm'
                    color={"gray.400"}
                    fontWeight='400'>
                    Monthly product changes
                  </Text>
                </Flex>
                <Flex align='center' mb='20px'>
                  <DarkMode>
                    <Switch colorScheme='brand' me='10px' />
                  </DarkMode>
                  <Text
                    noOfLines={1}
                    fontSize='sm'
                    color={"gray.400"}
                    fontWeight='400'>
                    Subscribe to newsletter
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
        </Card>
      </Grid>


      <Grid
        templateColumns={{
          sm: "1fr",
          xl: "repeat(2, 1fr)",
          "2xl": "1fr 2fr 1.2fr",
        }}
        gap='10px'
        mb='24px'>

        {/* Spot Margin */}
        <Card
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          h={{ sm: "270px", lg: "350px", xl: "410px" }}
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Spot Margin Settings
            </Text>
          </CardHeader>
          <Flex direction='column' h='400px'>
        
          </Flex>
        </Card>


        {/* Account Activity */}
        <Card
          p='16px'
          maxH={{ md: "410px" }}
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          gridArea={{ xl: "1 / 2 / 2 / 3", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Account Activity
            </Text>
          </CardHeader>
          <CardBody px='5px'>
              <Flex direction='column'>
                <Text fontSize='10px' color={"gray.400"} mb='20px'>
                <ProfileAccountActivity/>
                </Text>
                
              </Flex>
            </CardBody>
        </Card>
         {/* Fees */}
        <Card
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          h={{ sm: "270px", lg: "350px", xl: "410px" }}
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Fees
            </Text>
          </CardHeader>
          <Flex direction='column' h='400px'>
          <WalletListScreen />
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;
