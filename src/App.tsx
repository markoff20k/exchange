import * as React from 'react';
import * as ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { gaTrackerKey } from './api';
import { ErrorWrapper } from './containers';
import { useSetMobileDevice } from './hooks';
import * as mobileTranslations from './mobile/translations';
import { createBrowserHistory } from 'history';
import { selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';

const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();

if (gaKey) {
	ReactGA.initialize(gaKey);
	browserHistory.listen(location => {
		ReactGA.set({ page: location.pathname });
		ReactGA.pageview(location.pathname);
	});
}

/* Mobile components */
const MobileFooter = React.lazy(() =>
	import('./mobile/components/NewBottomNavbar').then(({ BottomNavbar }) => ({ default: BottomNavbar })),
);
const MobileHeader = React.lazy(() => import('./mobile/components/Header').then(({ Header }) => ({ default: Header })));

/* Desktop components */
const AlertsContainer = React.lazy(() => import('./containers/Alerts').then(({ Alerts }) => ({ default: Alerts })));
const CustomizationContainer = React.lazy(() =>
	import('./containers/Customization').then(({ Customization }) => ({ default: Customization })),
);
const FooterContainer = React.lazy(() => import('./containers/Footer').then(({ Footer }) => ({ default: Footer })));
const HeaderContainer = React.lazy(() => import('./containers/Header').then(({ Header }) => ({ default: Header })));
const HeaderNavbarContainer = React.lazy(() => import('./containers/HeaderNavbar').then(({ HeaderNavbar }) => ({ default: HeaderNavbar })));
const HeaderAuthToolbarContainer = React.lazy(() => import('./containers/HeaderAuthToolbar').then(({ HeaderAuthToolbar }) => ({ default: HeaderAuthToolbar })));

const SidebarContainer = React.lazy(() => import('./containers/Sidebar').then(({ Sidebar }) => ({ default: Sidebar })));
const SBToggler = React.lazy(() =>
	import('./containers/SideBarToggle').then(({ SideBarToggle }) => ({ default: SideBarToggle })),
);
const LayoutContainer = React.lazy(() => import('./routes').then(({ Layout }) => ({ default: Layout })));
const NavBarContainer = React.lazy(() =>
	import('./containers/NavBar').then(({ NavBar }) => ({ default: NavBar })),
);


const getTranslations = (lang: string, isMobileDevice: boolean) => {
	if (isMobileDevice) {
		return {
			...languageMap[lang],
			...mobileTranslations[lang],
		};
	}

	return languageMap[lang];
};
//<SBToggler />
//<SidebarContainer />
const RenderDeviceContainers = () => {
	const isMobileDevice = useSelector(selectMobileDeviceState);

	if (isMobileDevice) {
		return (
			<div className="pg-mobile-app">
				<MobileHeader />
				<AlertsContainer />
				<LayoutContainer />
				<MobileFooter />
			</div>
		);
	}

	return (
		<React.Fragment>
			<HeaderContainer />
			{/*<HeaderAuthToolbarContainer />*/}
			<CustomizationContainer />
			<AlertsContainer />
			<LayoutContainer />
			<FooterContainer />

		</React.Fragment>
	);
};

export const App = () => {
	useSetMobileDevice();
	const lang = useSelector(selectCurrentLanguage);
	const isMobileDevice = useSelector(selectMobileDeviceState);

	return (
		<IntlProvider locale={lang} messages={getTranslations(lang, isMobileDevice)} key={lang}>
			<Router history={browserHistory}>
				<ErrorWrapper>
					<React.Suspense fallback={null}>
						<RenderDeviceContainers />
					</React.Suspense>
				</ErrorWrapper>
			</Router>
		</IntlProvider>
	);
};
