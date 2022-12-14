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
import React from 'react';

import { Box, useStyleConfig } from "@chakra-ui/react";
function CardBody(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
} 

export default CardBody;
