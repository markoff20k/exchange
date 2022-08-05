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
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
//import Globe from "../../components/Globe/Globe";
import IconBox from "../../components/Icons/IconBox";
import {
  barChartDataDashboard,
  barChartOptionsDashboard,
  lineChartDataDashboard,
  lineChartOptionsDashboard,
} from "../../variables/charts";

// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "../../components/Icons/Icons.js";

	
import {WalletListScreen, PortfolioValueScreen} from "../../../screens";

import { EstimatedValue } from '../../../containers/Wallets/EstimatedValue';

export default function Default() {
  // Chakra Color Mode
  const iconBoxInside = useColorModeValue("white", "white");
  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <Text color='#fff' fontSize='14' fontWeight='bold'>
        Minha carteira
      </Text>
      <Grid
        templateColumns={{ sm: "4fr 1fr", xl: "1.2fr 1fr" }}
        gap='26px'
        maxW='100%'
        w='100%'>

        <Stack
          direction='column'
          spacing='16px'
          w='100%'
          mt='24px'
          maxW={{ sm: "315px", md: "100%" }}
          zIndex='0'>
          {/* Mini Statistics */}
          <SimpleGrid columns={{ sm: "1", md: "2" }} spacing='24px'>
            <Card minH='83px'>
              <CardBody>
                <Flex
                  flexDirection='row'
                  align='center'
                  justify='center'
                  w='100%'>
                  <Stat me='auto'>
                    <StatLabel fontSize='14' color='gray.400' pb='20px' fontWeight='bold'>
                      Patrimônio total
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize='15' color='#fff'>
                        <PortfolioValueScreen/>
                      </StatNumber>
                      <StatHelpText
                        alignSelf='flex-end'
                        justifySelf='flex-end'
                        m='0px'
                        color='green.400'
                        fontWeight='bold'
                        ps='3px'
                        fontSize='sm'>
                        +55%
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <IconBox as='box' h={"45px"} w={"45px"} bg='transparent'>
                    <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                  </IconBox>
                </Flex>
              </CardBody>
            </Card>
            <Card minH='83px'>
              <CardBody>
                <Flex
                  flexDirection='row'
                  align='center'
                  justify='center'
                  w='100%'>
                  <Stat>
                    <StatLabel fontSize='xs' color='gray.400' pb='2px'>
                      New Clients
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize='lg' color='#fff'>
                        +$3,020
                      </StatNumber>
                      <StatHelpText
                        alignSelf='flex-end'
                        justifySelf='flex-end'
                        m='0px'
                        color='red.500'
                        fontWeight='bold'
                        ps='3px'
                        fontSize='sm'>
                        -14%
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <Spacer />
                  <IconBox as='box' h={"45px"} w={"45px"} bg='brand.200'>
                    <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                  </IconBox>
                </Flex>
              </CardBody>
            </Card>
          </SimpleGrid>
          {/* Sales table */}
          <Card px='0px'>
            <CardHeader px='22px' mb='32px'>
              <Text color='#fff' fontSize='13' fontWeight='bold'>
                Composição da Carteira
              </Text>
            </CardHeader>
            <CardBody overflowX={{ sm: "scroll", md: "hidden" }}>
              <WalletListScreen/>
            </CardBody>
          </Card>
        </Stack>
      </Grid>
    {/*  <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        maxW={{ sm: "350px", md: "100%" }}
        gap='24px'
        mb='24px'>
    
        <Card p='16px'>
          <CardBody>
            <Flex direction='column' w='100%'>
              <Box
                bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
                borderRadius='20px'
                display={{ sm: "flex", md: "block" }}
                justify={{ sm: "center", md: "flex-start" }}
                align={{ sm: "center", md: "flex-start" }}
                minH={{ sm: "180px", md: "220px" }}
                p={{ sm: "0px", md: "22px" }}>
                <BarChart
                  chartOptions={barChartOptionsDashboard}
                  chartData={barChartDataDashboard}
                />
              </Box>
              <Flex
                direction='column'
                mt='24px'
                mb='36px'
                alignSelf='flex-start'>
                <Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
                  Active Users
                </Text>
                <Text fontSize='md' fontWeight='medium' color='gray.400'>
                  <Text as='span' color='green.400' fontWeight='bold'>
                    (+23%)
                  </Text>{" "}
                  than last week
                </Text>
              </Flex>
              <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                <Flex direction='column'>
                  <Flex alignItems='center'>
                    <IconBox
                      as='box'
                      h={"30px"}
                      w={"30px"}
                      bg='brand.200'
                      me='6px'>
                      <WalletIcon h={"15px"} w={"15px"} color='#fff' />
                    </IconBox>
                    <Text fontSize='sm' color='gray.400'>
                      Users
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ sm: "md", lg: "lg" }}
                    color='#fff'
                    fontWeight='bold'
                    mb='6px'
                    my='6px'>
                    32,984
                  </Text>
                  <Progress
                    colorScheme='brand'
                    bg='#2D2E5F'
                    borderRadius='30px'
                    h='5px'
                    value={20}
                  />
                </Flex>
                <Flex direction='column'>
                  <Flex alignItems='center'>
                    <IconBox
                      as='box'
                      h={"30px"}
                      w={"30px"}
                      bg='brand.200'
                      me='6px'>
                      <RocketIcon h={"15px"} w={"15px"} color='#fff' />
                    </IconBox>
                    <Text fontSize='sm' color='gray.400'>
                      Clicks
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ sm: "md", lg: "lg" }}
                    color='#fff'
                    fontWeight='bold'
                    mb='6px'
                    my='6px'>
                    2.42m
                  </Text>
                  <Progress
                    colorScheme='brand'
                    bg='#2D2E5F'
                    borderRadius='30px'
                    h='5px'
                    value={90}
                  />
                </Flex>
                <Flex direction='column'>
                  <Flex alignItems='center'>
                    <IconBox
                      as='box'
                      h={"30px"}
                      w={"30px"}
                      bg='brand.200'
                      me='6px'>
                      <CartIcon h={"15px"} w={"15px"} color='#fff' />
                    </IconBox>
                    <Text fontSize='sm' color='gray.400'>
                      Sales
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ sm: "md", lg: "lg" }}
                    color='#fff'
                    fontWeight='bold'
                    mb='6px'
                    my='6px'>
                    2,400$
                  </Text>
                  <Progress
                    colorScheme='brand'
                    bg='#2D2E5F'
                    borderRadius='30px'
                    h='5px'
                    value={30}
                  />
                </Flex>
                <Flex direction='column'>
                  <Flex alignItems='center'>
                    <IconBox
                      as='box'
                      h={"30px"}
                      w={"30px"}
                      bg='brand.200'
                      me='6px'>
                      <StatsIcon h={"15px"} w={"15px"} color='#fff' />
                    </IconBox>
                    <Text fontSize='sm' color='gray.400'>
                      Items
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ sm: "md", lg: "lg" }}
                    color='#fff'
                    fontWeight='bold'
                    mb='6px'
                    my='6px'>
                    320
                  </Text>
                  <Progress
                    colorScheme='brand'
                    bg='#2D2E5F'
                    borderRadius='30px'
                    h='5px'
                    value={50}
                  />
                </Flex>
              </SimpleGrid>
            </Flex>
          </CardBody>
        </Card>
 
        <Card p='28px 0px 0px 0px'>
          <CardHeader mb='20px' ps='22px'>
            <Flex direction='column' alignSelf='flex-start'>
              <Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
                Sales Overview
              </Text>
              <Text fontSize='md' fontWeight='medium' color='gray.400'>
                <Text as='span' color='green.400' fontWeight='bold'>
                  (+5%) more
                </Text>{" "}
                in 2021
              </Text>
            </Flex>
          </CardHeader>
          <Box w='100%' minH={{ sm: "300px" }}>
            <LineChart
              chartData={lineChartDataDashboard}
              chartOptions={lineChartOptionsDashboard}
            />
          </Box>
        </Card>
      </Grid> */}
    </Flex>
  );
}
