import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Decimal } from '../../components';
import { ReactTable } from '../../containers';
import { EstimatedValue } from '../../containers/Wallets/EstimatedValue';
import { setDocumentTitle } from '../../helpers';
import {
	walletsFetch,
	currenciesFetch,
	allChildCurrenciesFetch,
	beneficiariesFetch,
	selectWallets,
	selectCurrencies,
	selectAllChildCurrencies,
} from '../../modules';
import NP from 'number-precision';
NP.enableBoundaryChecking(false); // default param is true


export const PortfolioValueScreen = () => {
	setDocumentTitle('Wallets');
	const intl = useIntl();

	// state
	const [hideSmallBalanceState, setHideSmallBalanceState] = React.useState<boolean>(false);

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

	// function
	const findIcon = (code: string): string => {
		const currency = currencies.find((currency: any) => currency.id === code);
		try {
			return require(`../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
		} catch (err) {
			if (currency !== undefined && currency.icon_url) {
				return currency.icon_url;
			}
			return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
		}
	};

	const columns = React.useMemo(
		() => [
			{ Header: 'Ativo', accessor: 'coin' },
			{ Header: 'Total', accessor: 'total' },
			{ Header: 'Disponível', accessor: 'available' },
			{ Header: 'Em uso', accessor: 'in_order' },
			{ Header: 'Transferir', accessor: 'action' },
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
						{'   '}
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

	return (
		<div id="wallet-list-screen">

				
				{
				<div className="row">
					<div className="col-12">
						<EstimatedValue wallets={wallets} />
					</div>
				</div>

			}



		</div>
	);
};
