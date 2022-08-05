import classNames from 'classnames';
//import { TOGGLE_SIDEBAR } from 'modules/public/globalSettings/constants';
import * as React from 'react';
import { Nav } from 'react-bootstrap';
import { FaAward, FaGift, FaHistory, FaSignOutAlt, FaStar, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutFetch, selectUserLoggedIn } from '../../modules';

import { NavBar } from '../NavBar';

const IconWallet = require('../../assets/svg/wallet2.svg');
const IconDashboard = require('../../assets/svg/dashboard2.svg');

export const HeaderAuthToolbar: React.FC = () => {
	const history = useHistory();
	const intl = useIntl();

	const isLoggedIn = useSelector(selectUserLoggedIn);
	const [activeNow, setActiveNow] = React.useState('');
	const [activeItemDrop, setActiveItemDrop] = React.useState('');

	const dispatch = useDispatch();

	const setStateActiveNow = (nameActive: string) => {
		setActiveNow(nameActive);
		setActiveItemDrop('');
	};

	const classActiveItemDrop = (nameItem: string) =>
		classNames('subheader__right-menu__dropdown__wrap__content__title d-flex align-items-center', {
			'subheader__right-menu__dropdown__wrap__content__title--active': activeItemDrop === nameItem,
		});

	const classLinkActive = (nameActive: string) => {
		return classNames('subheader__left-menu__dropdown__wrap', {
			'subheader__left-menu__dropdown__wrap--active': activeNow === nameActive,
		});
	};

	const classLinkActiveTitleDrop = (nameActive: string) => {
		return classNames('subheader__right-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center', {
			'subheader__right-menu__dropdown__wrap__dropbtn--active': activeNow === nameActive,
		});
	};

	const renderWalletLink = () => {
		const classItemTitle = classNames('subheader__right-menu__item__title', {
			'subheader__right-menu__item__title--active': activeNow === 'Wallet',
		});

		return (
			isLoggedIn && (
				<div className="subheader__right-menu__item__title">
					<div className={classItemTitle} onClick={() => setStateActiveNow('Wallet')} >
						 
					

						<Link to="/wallets">Wallets
						</Link>
					</div>
				</div>
			)
		);
	};


	const renderDashboardTab = () => {
		return (
			isLoggedIn && (
			
				<div className="subheader__right-menu__dropdown__wrap">
					<span className={classLinkActiveTitleDrop('dashboard')}>
					<img src={IconDashboard} className="subheader__right-menu__item__title__svg" style={{width: '20px',}} />
						{translate('page.body.homepage.header.dashboard')}
						<div className="subheader__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
					</span>
					<div className="subheader__right-menu__dropdown__wrap__content">
						<Link
							to="/dashboard"
							onClick={() => {
								setStateActiveNow('dashboard');
								setActiveItemDrop('dashboard');
							}}
						>
							<div className={classActiveItemDrop('dashboard')}>
								<FaStar className="mr-2" />
								{translate('page.body.homepage.header.openOrder')}
							</div>
						</Link>
						<Link
							to="/history"
							onClick={() => {
								setStateActiveNow('dashboard');
								setActiveItemDrop('history');
							}}
						>
							<div className={classActiveItemDrop('history')}>
								<FaHistory className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" />
								{translate('page.body.homepage.header.history')}
							</div>
						</Link>
					</div>
				</div>
			
			)
		);
	};

	const renderFinanceTab = () => {
		return (
			isLoggedIn && (
			
				<div className="subheader__right-menu__dropdown__wrap">
					<span className={classLinkActiveTitleDrop('finance')}>
					<img src={IconWallet} className="subheader__right-menu__item__title__svg" style={{width: '20px',}} />
						{translate('page.body.homepage.header.finance')}
						<div className="subheader__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
					</span>
					<div className="subheader__right-menu__dropdown__wrap__content">
						<Link
							to="/wallets"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('wallets');
							}}
						>
							<div className={classActiveItemDrop('wallets')}>
								<FaStar className="mr-2" />
								{translate('page.body.homepage.header.wallet')}
							</div>
						</Link>
						<Link
							to="/history"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('transaction');
							}}
						>
							<div className={classActiveItemDrop('transaction')}>
								<FaHistory className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" />
								{translate('page.body.homepage.header.transaction')}
							</div>
						</Link>
						<Link
							to="/deposit"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('deposit');
							}}
						>
							<div className={classActiveItemDrop('deposit')}>
								<FaHistory className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" />
								{translate('page.body.homepage.header.deposit')}
							</div>
						</Link>
						<Link
							to="/withdraw"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('withdraw');
							}}
						>
							<div className={classActiveItemDrop('withdraw')}>
								<FaHistory className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" />
								{translate('page.body.homepage.header.withdraw')}
							</div>
						</Link>
					</div>
				</div>
			
			)
		);
	};

	const renderLogout = () => {
		if (!isLoggedIn) {
			return null;
		}

		return (
			<Link
				to=" "
				onClick={() => {
					dispatch(logoutFetch());
					setStateActiveNow('');
					setActiveItemDrop('');
				}}
			>
				<div className="subheader__right-menu__dropdown__wrap__content__title d-flex align-items-center">
					<FaSignOutAlt className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" />
					<FormattedMessage id={'page.body.profile.content.action.logout'} />
				</div>
			</Link>
		);
	};

	const renderProfileLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/profile"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('profile');
					}}
				>
					<div className={classActiveItemDrop('profile')}>
						<FaUserCircle className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" />
						<FormattedMessage id={'page.header.navbar.profile'} />
					</div>
				</Link>
			)
		);
	};

	const renderProfileTab = () => {
		return (
			isLoggedIn && (
				<>
					<div className="subheader__right-menu__dropdown__wrap">
						<span className={classLinkActiveTitleDrop('account')}>
							{translate('page.body.homepage.header.account')}
							<div className="subheader__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
						</span>
						<div className="subheader__right-menu__dropdown__wrap__content subheader__right-menu__dropdown__wrap__content--account">
							{renderProfileLink()}
							{renderReferralLink()}
							{renderLogout()}
						</div>
					</div>
				</>
			)
		);
	};

	const renderReferralLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/referral"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('referral');
					}}
				>
					<div className={classActiveItemDrop('referral')}>
						<FaUserPlus className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" />
						<FormattedMessage id={'page.header.navbar.referral'} />
					</div>
				</Link>
			)
		);
	};

	const redirectSingIn = () => {
		history.push('/banner/authentication/sign-in/basic');
	};

	const redirectSingUp = () => {
		history.push('/banner/authentication/sign-up/basic');
	};

	const translate = (key: string) => intl.formatMessage({ id: key });

	const renderUnLogin = () => {
		const classLinkActiveLogin = classNames('subheader__right-menu__item__title', {
			'subheader__right-menu__item__title--active': activeNow === 'login',
		});

		const classLinkActiveRegister = classNames('subheader__right-menu__item__title subheader__right-menu__item__title--btn ', {
			'subheader__right-menu__item__title--btn--active': activeNow === 'register',
		});

		return (
			!isLoggedIn && (
				<>
					<div
						className="subheader__right-menu__item flex-shrink-0 custom-poiter"
						onClick={e => {
							redirectSingIn();
							setStateActiveNow('login');
						}}
					>
						<div className={classLinkActiveLogin}>
							<span>{translate('page.body.homegape.header.button2')}</span>
						</div>
					</div>
					<div
						className="subheader__right-menu__item flex-shrink-0 custom-poiter"
						onClick={e => {
							redirectSingUp();
							setStateActiveNow('register');
						}}
					>
						<span className={classLinkActiveRegister}>{translate('page.body.homegape.header.button3')}</span>
					</div>
				</>
			)
		);
	};

	return (
		isLoggedIn && (
			<>
		<div className="subheaderDesktop-screen">
			<div className="container-subheader">
				<nav className="subheader d-flex flex-row justify-content-between align-items-center">
					<div className="subheader__left-menu d-flex flex-row align-items-center">
					
						{renderUnLogin()}
						{renderDashboardTab()}
						{renderFinanceTab()}
						
					




					</div>

					<div className="subheader__right-menu d-flex align-items-center flex-row">
						{renderUnLogin()}
						
						<NavBar />
					</div>
				</nav>
			</div>
		</div>
		</>
		)
		


	);
};
