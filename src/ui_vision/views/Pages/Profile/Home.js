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
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import Container from 'react-bootstrap/Container';
import { Decimal } from 'components';

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

import { ReactTable } from 'containers';

import { selectUserActivity, selectUserInfo } from 'modules';
import { ProfileAccountActivity, ProfileActiveStep, ProfileAuthDetails, Profile2FA, ProfileAnnouncement, ProfileApiKeys, ProfileTwoFactorAuth, ProfileSecurity, ProfileVerification } from 'containers';
import { localeDate, setDocumentTitle } from 'helpers';

import {
	walletsFetch,
	currenciesFetch,
	allChildCurrenciesFetch,
	beneficiariesFetch,
	selectWallets,
	selectCurrencies,
	selectAllChildCurrencies,
} from 'modules';

import { WalletListScreen } from 'screens';

import NP from 'number-precision';
NP.enableBoundaryChecking(false); // default param is true



const intl = useIntl();

// state
const [hideSmallBalanceState, setHideSmallBalanceState] = React.useState(false);

// intl
const withdrawButtonLabel = React.useMemo(() => intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw' }), [intl]);
const depositButtonLabel = React.useMemo(() => intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' }), [intl]);

// history
const history = useHistory();

// dispatch
const dispatch = useDispatch();
const dispatchFetchWallets = React.useCallback(() => dispatch(walletsFetch()), [dispatch]);
const dispatchcFetchCurrencies = React.useCallback(() => dispatch(currenciesFetch()), [dispatch]);
const dispatchcFetchAllChildCurrencies = React.useCallback(() => dispatch(allChildCurrenciesFetch()), [dispatch]);
const dispatchFetchBeneficiaries = React.useCallback(() => dispatch(beneficiariesFetch()), [dispatch]);

// side effect
React.useEffect(() => {
	dispatchFetchWallets();
	dispatchcFetchCurrencies();
	dispatchcFetchAllChildCurrencies();
	dispatchFetchBeneficiaries();
}, [dispatchFetchBeneficiaries, dispatchFetchWallets, dispatchcFetchCurrencies, dispatchcFetchAllChildCurrencies]);

// selector
const wallets = useSelector(selectWallets);
const currencies = useSelector(selectCurrencies);
const all_child_currencies = useSelector(selectAllChildCurrencies);

const findIcon = (code) => {
  const currency = currencies.find((currency) => currency.id === code);

      return currency.icon_url;
}


const columns = React.useMemo(
  () => [
    { Header: 'Coin', accessor: 'coin' },
    { Header: 'Total', accessor: 'total' },
    { Header: 'Available', accessor: 'available' },
    { Header: 'In Order', accessor: 'in_order' },
    { Header: 'Action', accessor: 'action' },
  ],
  [],
);

const [searchInputState, setSearchInputState] = React.useState('');

const data = wallets
.filter(wallet => !all_child_currencies.map(cur => cur.id).includes(wallet.currency))
.map(wallet => {
  const childCurrencies = all_child_currencies
    .filter(childCurrency => childCurrency.parent_id === wallet.currency)
    .map(childCurrency => childCurrency.id);

  const totalChildBalances = wallets
    .filter(wal => childCurrencies.includes(wal.currency))
    .map(child => Number(child.balance))
    .reduce((x, y) => x + y, 0);

  const totalChildLocked = wallets
    .filter(wal => childCurrencies.includes(wal.currency))
    .map(child => Number(child.locked))
    .reduce((x, y) => x + y, 0);

  return {
    ...wallet,
    total: Number(wallet.balance) + Number(wallet.locked) + totalChildBalances + totalChildLocked,
    balance: Number(wallet.balance) + totalChildBalances,
    locked: Number(wallet.locked) + totalChildLocked,
  };
})
.filter(wallet => wallet.currency.toLowerCase().includes(searchInputState.toLowerCase()))
.filter(wallet => (hideSmallBalanceState ? wallet.total > 0 : true))
.sort((prev_wallet, next_wallet) => {
  //sort desc
  return next_wallet.total - prev_wallet.total;
})
.map((wallet, index) => {
  const total = NP.plus(wallet.balance || 0, wallet.locked || 0);
  const currency_icon = (
    <img
      width="30px"
      height="30px"
      src={wallet.iconUrl ? wallet.iconUrl : findIcon(wallet.currency)}
      alt={wallet.currency + '_icon'}
    />
  );
  const isWithdrawEnabled = wallet.type === 'fiat' || wallet.balance;
  const { fixed } = wallets.find(w => w.currency === wallet.currency) || { fixed: 8 };

  return {
    coin: (
      <span className="text-left">
        {' '}
        {currency_icon} {wallet.currency.toUpperCase()} <span className="text-secondary">{wallet.name}</span>
      </span>
    ),
    total: (
      <Decimal key={index} fixed={fixed}>
        {total > 0 ? total : 0}
      </Decimal>
    ),
    available: (
      <span>
        <Decimal key={index} fixed={fixed}>
          {wallet.balance > 0 ? wallet.balance : 0}
        </Decimal>
      </span>
    ),
    in_order: (
      <span className="text-secondary">
        <Decimal key={index} fixed={fixed}>
          {wallet.locked > 0 ? wallet.locked : 0}
        </Decimal>
      </span>
    ),
    action: (
      <div className="text-center">
        <button
          className="deposit-button"
          onClick={() =>
            history.push({ pathname: '/wallets/deposit/' + String(wallet.currency).toUpperCase() })
          }
        >
          {depositButtonLabel}
        </button>
        <button
          className="withdraw-button"
          disabled={!isWithdrawEnabled}
          onClick={() =>
            history.push({ pathname: '/wallets/withdraw/' + String(wallet.currency).toUpperCase() })
          }
        >
          {withdrawButtonLabel}
        </button>
      </div>
    ),
  };
});

const renderTable = () => {
  return <ReactTable columns={columns} data={[...data]} headColor="#222B42" />;
};

const onChange = e => {
  setSearchInputState(String(e.target.value).toUpperCase());
};


function Wallets() {
  // Chakra color mode



    return ( 
    
    <Flex direction='column' pt={{ sm: "120px", md: "75px" }}>
    
    </Flex>
  );
}

export default Wallets;
