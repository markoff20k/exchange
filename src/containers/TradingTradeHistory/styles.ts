import styled from 'styled-components';

export const MarketHistory = styled.div`
	background color = #0b1426;
	font-weight: 500;
	font-size: 25px;
	padding: 10px;
	padding-right: 10px;
	height: 100%;
	position: absolute;
	top: 3px;
	left: 3px;
	bottom: 3px;
	right: 0;
	height: calc(100% - 6px);

	.td-tabs {
		height: 100%;
		display: flex;
		flex-direction: column;
		.td-tabs-tabpane {
			outline: none;
		}
		.td-tabs-nav-list {
			display: flex;
			.td-tabs-tab {
				font0size: 13px;
				font-weight: 500;
				&.td-tabs-tab-active {
					font-weight: 500;
					.td-tabs-tab-btn {
						color: #fff;
						border-bottom: 2px solid #009991;
					}
				}
				:not(:last-child) {
					margin-right: 24px;
				}
				.td-tabs-tab-btn {
					color: #848e9c;
					font-size: 13px;
					font-weight: 500;

					padding: 5px 0;
					outline: none;
					cursor: pointer;
				}
			}
		}
		.td-tabs-content-holder {
			font-size: 12px;
			font-weight: 200;
			flex: 1;
			.td-tabs-content {
				height: 100%;
				.td-tabs-tabpane {
					height: 100%;
				}
			}
		}
		.td-tabs-ink-bar,
		.td-tabs-nav-operations {
			display: none;
		}
	}
	.td-recent-trades__markets,
	.td-recent-trades__yours {
		overflow-x: hidden;
		overflow-y: scroll;
		position: relative;
		font-weight: 300;
		height: 100%;
		&__negative {
			color: #DA2C43;
		}
		&__positive {
			color: #00CC99;
		}
		.td-table-container {
			padding-top: 10px;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			flex-direction: column;
			.td-table {
				background: transparent;
				width: 100%;
				height: 100%;
				.td-table__head {
					height: 22px;
					display: block;
					background: transparent;
					tr {
						background: transparent;
						display: flex;
						padding-right: 20px;
						th {
							width: calc(100% / 3);
							background-color: transparent;
							padding: 2px 0 !important;
							font-weight: 400;
							color: #848e9c;
							text-align: right;
							:first-child {
								text-align: left;
							}
						}
					}
				}
				.td-table__body {
					padding-right: 15px;
					color: #fff;
					background: transparent;
					height: calc(100% - 22px);
					::-webkit-scrollbar {
						-webkit-appearance: none;
						width: 5px;
					}

					::-webkit-scrollbar-thumb {
						border-radius: 4px;
						background-color: #c4c4c4;
						box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
					}
					tr {
						background: transparent;
						td.td-table__empty:nth-child(2) {
							text-align: center;
						}
						td {
							color: #fff;
							padding: 3px 0 !important;
							text-align: right;
							background-color: transparent;
							:first-child {
								text-align: left;
							}
						}
					}
				}
			}
		}
	}
`;
