import React from 'react';
import { HomepageMarket } from '../../containers';
import { useHistory } from 'react-router-dom';
import { NewMarketSlick } from '../../components';
import { eventFetch, selectEvents } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SaleListTables } from '../../plugins/Sale/containers/SaleListTables';

import { TickerTape } from 'react-tradingview-embed';

import Feature1 from './Home/Feature1.svg';
import Feature2 from './Home/Feature2.svg';
import Feature3 from './Home/Feature3.svg';
import Feature4 from './Home/Feature4.svg';
import Feature5 from './Home/Feature5.svg';
import Feature6 from './Home/Feature6.svg';
import AppStore from './Home/AppStore.svg';
import GgPlay from './Home/GgPlay.svg';
import Cryp from './Home/Cryp.svg';
import Banner_Event from './Home/crypto-animation.gif';

import { Player, Controls } from '@lottiefiles/react-lottie-player';




const Logo = require('../../assets/images/logo_branca_bandeira_verde.svg');

const Logo_Capital = require ('../../assets/images/svg/branco_capital_bandeira_verde.svg');

const Anime1 = require ('../../assets/animation/Bigscene-1-.json');

export const FortemIOHomePage = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(eventFetch());
	}, []);

	const events = useSelector(selectEvents);
	const settingEvents = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 6000,
		pauseOnHover: true,
	};

	const renderEvent = () => {
		return (
			
			<div className="info">
				
				<div className="banner">
				
					<Slider {...settingEvents}>
						{[...events.payload].map(event => {
							return (
								<div style={{width: '100%', height: '100%', position:'relative'}}>
									
										<img src={event.image_link} style={{ width: '640px', height:'640px',  margin: 'auto', background: 'black',  }}  />
										
										<img src={Logo_Capital} style={{ position: 'absolute', background: 'black', width: '360px', height:'360px', margin: 'auto', top: '90px'}}  />
										<p className='custom-text' style={{position: 'absolute',  top: '10px', color: 'white', display: 'flex', justifyContent:'center', alignItems:'center', fontSize: "2rem" }}>{event.event_name}</p>
										<p className='custom-text' style={{position: 'absolute', bottom: '10px', color: 'white', display: 'flex', justifyContent:'center', alignItems:'center', fontSize: "1.5rem", margin: 'auto'  }}>{event.description}</p>
									
									
								</div>

							);
						})}
					</Slider>
					<TickerTape />
				</div>
			</div>
	
		);
	};
	
	const renderMarketSlick = () => <NewMarketSlick />;
	
	const RedirectMarketList = () => {
		history.push('/markets');
	};
	const renderMarket = () => (
		<div className="market">
			<div className="container">
								<div className="home-market">
					<HomepageMarket />
				</div>
				<div className="redirect-to-market">
					<button onClick={RedirectMarketList}>All Markets</button>
				</div>
			</div>
		</div>
	);
	//
	const renderFeature = () => (
		<div className="feature">
			<div className="container">
				<div className="feature-row">
					<div className="feature-row__col">
						<div className="feature-box feature-box__top">
							<div className="feature-box__icon ">
								<img src={Feature1} alt="Feature1" />
							</div>
							<span className="feature-box__title">User-friendly and customizable interfaces with conventional tools.</span>
						</div>
						<div className="feature-box">
							<div className="feature-box__icon">
								<img src={Feature2} alt="Feature1" />
							</div>
							<span className="feature-box__title">Processing speed transactions and TCP connections.</span>
						</div>
					</div>
					<div className="feature-row__col">
						<div className="feature-box feature-box__top">
							<div className="feature-box__icon">
								<img src={Feature3} alt="Feature1" />
							</div>
							<span className="feature-box__title">Security of user information and funds is our first priority.</span>
						</div>
						<div className="feature-box">
							<div className="feature-box__icon">
								<img src={Feature4} alt="Feature1" />
							</div>
							<span className="feature-box__title">Professional market analytics</span>
						</div>
					</div>
					<div className="feature-row__col">
						<div className="feature-box feature-box__top">
							<div className="feature-box__icon">
								<img src={Feature5} alt="Feature1" />
							</div>
							<span className="feature-box__title">Processing speed transactions and TCP connections.</span>
						</div>
						<div className="feature-box">
							<div className="feature-box__icon">
								<img src={Feature6} alt="Feature1" />
							</div>
							<span className="feature-box__title">API Documentation.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	//
	const renderTrading = () => (
		<div className="trading">
			<div className="container">
				<div className="row">
					<div className="col-xl-6 lg-12 trading trading-content">
						<h3 className="trading-title">Start investing digital assets today!</h3>
						<p className="trading-description">
							Download Fortem APP, you will be able to easily at any time, anywhere trading global mainstream,
							popular digital assets.
						</p>
						<div className="trading-direction">
							<div className="trading-direction__app-store">
								<img src={AppStore} alt="App store" />
							</div>
							<div className="trading-direction__GG-play">
								<img src={GgPlay} alt="google Play" />
							</div>
						</div>
					</div>
					<div className="col-xl-6 lg-12 trading-cryp">
						<img src={Cryp} alt="crypto" />
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="cx-homepage">
			{renderEvent()}
			{renderMarketSlick()}
			<Player
  autoplay
  loop
  src="https://assets1.lottiefiles.com/packages/lf20_8wuout7s.json"
  style={{ height: '640px', width: '640px', background: 'black' }}
>
  <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
</Player>

			

			{renderMarket()}
			{renderFeature()}
			{renderTrading()}
		</div>
	);
};
