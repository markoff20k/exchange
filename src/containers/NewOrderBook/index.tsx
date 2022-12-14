import downSvg from 'assets/images/trading/down.svg';
import { OrderBookBuySvg, OrderBookSellSvg, OrderBookSvg } from 'assets/images/trading/OrderBookSvg';
import upSvg from 'assets/images/trading/up.svg';
import { ConvertUsd, Decimal } from 'components';
import { accumulateVolume } from 'helpers';
import { useOrderBookFetch } from 'hooks';
import get from 'lodash/get';
import millify from 'millify';
import {
	Market,
	selectCurrentMarket,
	selectCurrentPrice,
	selectDepthAsks,
	selectDepthBids,
	selectMarketTickers,
	setCurrentAmount,
	setCurrentPrice,
	setOrderType,
	Ticker,
} from 'modules';
import * as React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import isEqual from 'react-fast-compare';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { OrderBookStyle, TrStyle } from './styles';

const defaultTicker = { amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%' };

const OrderBookContainer = props => {
	useOrderBookFetch();
	const { formatMessage } = useIntl();
	const dispatch = useDispatch();
	const [tabState, setTabState] = React.useState<'all' | 'buy' | 'sell'>('all');
	const [width, setWidth] = React.useState(0);
	const orderRef = React.useRef<HTMLDivElement>(null);

	const bids = useSelector(selectDepthBids);
	const asks = useSelector(selectDepthAsks);
	const currentMarket = useSelector(selectCurrentMarket, isEqual);
	const currentPrice = useSelector(selectCurrentPrice, isEqual);
	const marketTickers = useSelector(selectMarketTickers, isEqual);

	const getTickerValue = React.useCallback((cMarket: Market, tickers: { [key: string]: Ticker }) => {
		return tickers[cMarket.id] || defaultTicker;
	}, []);

	// eslint-disable-next-line
	React.useEffect(() => {
		const { current } = orderRef;
		if (current && current.clientWidth !== width) {
			setWidth(current.clientWidth);
		}
	});

	const currentTicker = currentMarket && getTickerValue(currentMarket, marketTickers);
	const quoteUnit = get(currentMarket, 'quote_unit', '').toUpperCase();
	const baseUnit = get(currentMarket, 'base_unit', '').toUpperCase();

	const renderOrderBook = React.useCallback((array: string[][], side: string, currentM?: Market) => {
		// tslint:disable-next-line: no-shadowed-variable
		const maxVolume = Math.max(...array.map(a => Number(a[1])));
		const priceFixed = currentM ? currentM.price_precision : 0;
		const amountFixed = currentM ? currentM.amount_precision : 0;

		return array.map((item, i) => {
			const [price, volume] = item;

			const volumnCustom =
				+volume > 10000000
					? millify(+volume, {
							precision: 2,
					  })
					: Decimal.formatRemoveZero(volume, amountFixed);

			return [
				Decimal.formatRemoveZero(price, priceFixed),
				volumnCustom,
				Decimal.formatRemoveZero(+price * +volume, priceFixed),
				Number((Number(volume) / (maxVolume / 100)).toFixed(2)),
			];
		});
	}, []);

	const handleOnSelectBids = React.useCallback(
		(index: string, total: number) => {
			const priceToSet = bids[Number(index)] && Number(bids[Number(index)][0]);
			if (currentPrice !== priceToSet && currentMarket) {
				dispatch(setCurrentPrice(priceToSet));
				dispatch(setCurrentAmount(Decimal.formatRemoveZero(total, currentMarket.amount_precision)));
				dispatch(setOrderType('buy'));
			}
		},
		[bids, currentPrice, dispatch],
	);

	const handleOnSelectAsks = React.useCallback(
		(index: string, total: number) => {
			const priceToSet = asks[Number(index)] && Number(asks[Number(index)][0]);
			if (currentPrice !== priceToSet && currentMarket) {
				dispatch(setCurrentPrice(priceToSet));
				dispatch(setCurrentAmount(Decimal.formatRemoveZero(total, currentMarket.amount_precision)));
				dispatch(setOrderType('sell'));
			}
		},
		[currentPrice, dispatch, asks],
	);

	const arrAsksElm = renderOrderBook(asks, 'asks', currentMarket);
	const arrBidsElm = renderOrderBook(bids, 'bids', currentMarket);
	const noDataElm = (
		<tr>
			<td className="td-order-book-table__empty_data text-center" style={{ width: '100%' }}>
				{formatMessage({ id: 'page.noDataToShow' })}
			</td>
		</tr>
	);
	const getBidsElm = React.useCallback(() => {
		if (arrBidsElm.length > 0) {
			const total = accumulateVolume(bids);

			return arrBidsElm.map((item, i) => (
				<div className="flash_green"> 
				<TrStyle
					color="#00755E"
					placement="right"
					percentWidth={(item[3] as number) || 0}
					key={i}
					onClick={() => handleOnSelectBids(i.toString(), total[i])}
				>
					<td className="td-order-book-item__positive flash_green">{item[0]}</td>
					<td>{item[1]}</td>
					<td>{item[2]}</td>
				</TrStyle>
				</div>
			));
		}

		return noDataElm;
	}, [currentMarket, bids]);
	const getAsksElm = React.useCallback(() => {
		if (arrAsksElm.length > 0) {
			const total = accumulateVolume(asks);

			return arrAsksElm.map((item, i) => (
				<div className="flash_red"> 
				<TrStyle
					color="#9C2542"
					placement="left"
					percentWidth={(item[3] as number) || 0}
					key={i}
					onClick={() => handleOnSelectAsks(i.toString(), total[i])}
				>
					<td className="td-order-book-item__negative flash_red">{item[0]}</td>
					<td>{item[1]}</td>
					<td>{item[2]}</td>
				</TrStyle>
				</div>
			));
		}

		return noDataElm;
	}, [currentMarket, asks]);

	const infoTabs: Array<{
		labelTooltip: string;
		key: typeof tabState;
		render: () => JSX.Element;
	}> = [
		{
			labelTooltip: 'Livro de Ordens',
			key: 'all',
			render: () => (
				<OrderBookSvg
					active={tabState === 'all'}
					className="mr-2"
					onClick={() => {
						setTabState('all');
					}}
				/>
			),
		},
		{
			labelTooltip: 'Compradores',
			key: 'buy',
			render: () => (
				<OrderBookBuySvg
					active={tabState === 'buy'}
					className="mr-2"
					onClick={() => {
						setTabState('buy');
					}}
				/>
			),
		},
		{
			labelTooltip: 'Vendedores',
			key: 'sell',
			render: () => (
				<OrderBookSellSvg
					active={tabState === 'sell'}
					className="mr-2"
					onClick={() => {
						setTabState('sell');
					}}
				/>
			),
		},
	];

	const elementTabs = infoTabs.map(({ key, labelTooltip, render }) => (
		<OverlayTrigger
			key={key}
			placement="bottom"
			overlay={
				<Tooltip className="td-order-book-tooltip" id="td-order-book-header-all">
					{labelTooltip}
				</Tooltip>
			}
		>
			{render()}
		</OverlayTrigger>
	));

	const isPositive =
		currentMarket && /\+/.test(currentMarket && (marketTickers[currentMarket.id] || defaultTicker).price_change_percent);
	const cls = isPositive ? 'positive' : 'negative';

	return (
		<OrderBookStyle tabState={tabState}>
			<Row className="h-100">
				<Col className="h-100 td-order-book-wrapper p-0" xs={12}>
					<div className="td-order-book">
						<Row className="td-order-book-header">
							<Col className="p-0 d-flex align-items-center">{elementTabs}</Col>
							<Col className="p-0 d-flex align-items-center"></Col>
						</Row>
						<div className="td-order-book-tbheader">
							<div className="p-0">
								{`${formatMessage({ id: 'page.body.trading.header.orderBook.header.title.price' })}${
									currentMarket ? `(${quoteUnit})` : ''
								}`}
							</div>
							<div className="p-0">
								{`${formatMessage({ id: 'page.body.trading.header.orderBook.header.title.amount' })}${
									currentMarket ? `(${baseUnit})` : ''
								}`}
							</div>
							<div className="p-0 text-right">
								{`${formatMessage({ id: 'page.body.trading.header.orderBook.header.title.sum' })}${
									currentMarket ? `(${quoteUnit})` : ''
								}`}
							</div>
						</div>
						{tabState === 'all' || tabState === 'sell' ? (
							<table className="td-order-book-table td-reverse-table-body">
								<tbody>{getAsksElm()}</tbody>
							</table>
						) : null}
						<Row className="td-order-book-ticker">
							<Col
								className={`p-0  td-order-book-ticker__last-price d-flex align-items-center td-order-book-item__${cls}`}
								lg="auto"
							>
								{Decimal.format(
									+get(currentTicker, 'last', 0),
									get(currentMarket, 2, 2),
								)}
								
								{cls === 'positive' ? <img src={upSvg} /> : <img src={downSvg} />}
							</Col>
							<Col className={`p-0  td-order-book-ticker__usd d-flex align-items-center`} lg="auto">
								R${' '}
								<ConvertUsd
									value={+get(currentTicker, 'last', 0)}
									symbol={get(currentMarket, 'quote_unit', '')}
								/>
							</Col>
						</Row>
						{tabState === 'all' || tabState === 'buy' ? (
							<table className="td-order-book-table">
								<tbody>{getBidsElm()}</tbody>
							</table>
						) : null}
					</div>
				</Col>
			</Row>
		</OrderBookStyle>
	);
};

export const NewOrderBook = OrderBookContainer;
