import classNames from 'classnames';
//import { TOGGLE_SIDEBAR } from 'modules/public/globalSettings/constants';
import * as React from 'react';
import { FaAward, FaGift, FaHistory, FaSignOutAlt, FaStar, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutFetch, selectUserLoggedIn } from '../../modules';

import { ProfileActiveStepAction } from 'containers/ProfileActiveStepAction';


const Logo = require('../../assets/images/logo_branca_bandeira_verde.svg');

export const Header: React.FC = () => {
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
		classNames('header__right-menu__dropdown__wrap__content__title d-flex align-items-center', {
			'header__right-menu__dropdown__wrap__content__title--active': activeItemDrop === nameItem,
		});

	const classLinkActive = (nameActive: string) => {
		return classNames('header__left-menu__dropdown__wrap', {
			'header__left-menu__dropdown__wrap--active': activeNow === nameActive,
		});
	};

	const classLinkActiveTitleDrop = (nameActive: string) => {
		return classNames('header__right-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center', {
			'header__right-menu__dropdown__wrap__dropbtn--active': activeNow === nameActive,
		});
	};

	const renderWalletLink = () => {
		const classItemTitle = classNames('header__right-menu__item__title', {
			'header__right-menu__item__title--active': activeNow === 'Wallet',
		});

		return (
			isLoggedIn && (
				<div className="header__right-menu__item ">
					<div className={classItemTitle} onClick={() => setStateActiveNow('Wallet')}>
						<Link to="/wallets">My Wallets</Link>
					</div>
				</div>
			)
		);
	};

	const renderOrderTab = () => {
		return (
			isLoggedIn && (
			
				<div className="header__right-menu__dropdown__wrap">
					<span className={classLinkActiveTitleDrop('orders')}>
						{translate('page.body.homepage.header.orders')}
						<div className="header__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
					</span>
					<div className="header__right-menu__dropdown__wrap__content">
						<Link
							to="/orders"
							onClick={() => {
								setStateActiveNow('orders');
								setActiveItemDrop('orders');
							}}
						>
							<div className={classActiveItemDrop('orders')}>
								<FaStar className="mr-2" />
								{translate('page.body.homepage.header.openOrder')}
							</div>
						</Link>
						<Link
							to="/history"
							onClick={() => {
								setStateActiveNow('orders');
								setActiveItemDrop('history');
							}}
						>
							<div className={classActiveItemDrop('history')}>
								<FaHistory className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
								{translate('page.body.homepage.header.history')}
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
				<div className="header__right-menu__dropdown__wrap__content__title d-flex align-items-center">
					<FaSignOutAlt className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
					<FormattedMessage id={'page.body.profile.content.action.logout'} />
				</div>
			</Link>
		);
	};

	const renderProfileLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/admin/account/settings"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('perfil');
					}}
				>
					<div className={classActiveItemDrop('perfil')}>
						<FaUserCircle className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
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
					<div className="header__right-menu__dropdown__wrap">
						<span className={classLinkActiveTitleDrop('account')}>
							<FaUserCircle className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
							Jeferson Martin
							{/*{translate('page.body.homepage.header.account')}*/}
							<div className="header__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
						</span>
						<div className="header__right-menu__dropdown__wrap__content header__right-menu__dropdown__wrap__content--account">
							
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
					to="/admin/pages/profile/overview"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('kyc');
					}}
				>
					<div className={classActiveItemDrop('kyc')}>
						<FaUserCircle className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
						< ProfileActiveStepAction />
						{/*<FormattedMessage id={'page.header.navbar.profile'} />*/}
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
		const classLinkActiveLogin = classNames('header__right-menu__item__title', {
			'header__right-menu__item__title--active': activeNow === 'login',
		});

		const classLinkActiveRegister = classNames('header__right-menu__item__title header__right-menu__item__title--btn ', {
			'header__right-menu__item__title--btn--active': activeNow === 'register',
		});

		return (
			!isLoggedIn && (
				<>
					<div
						className="header__right-menu__item flex-shrink-0 custom-poiter"
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
						className="header__right-menu__item flex-shrink-0 custom-poiter"
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
	
		<div className="headerDesktop-screen">
			<div className="container-header">
					<div className="header__left-menu d-flex flex-row align-items-center">
						<div className="header__left-menu__logo" onClick={() => setStateActiveNow('')}>
							<Link to="/">
								<img src={Logo} alt="" />
							</Link>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className="header__left-menu__dropdown__wrap" style={{ top: '4px', fontSize:'30px !important', color: '#fff',  left: '50px' }} >
								|                    EXCHANGE 
							</div>
						</div>

				
			

						
						
						
						
						


	
	
					</div>
		
			</div>
		</div>

	);
};
