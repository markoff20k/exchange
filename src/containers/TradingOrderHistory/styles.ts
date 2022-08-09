import styled from 'styled-components';

export const OrderHistoryStyle = styled.div`
	background color = #0b1426;
	padding: 10px 5px;
	height: 350px;
	margin-bottom: 3px;
	font-weight: 500;
	font-size: 13px;

	.rc-tabs {
		font-size: 13px;
		height: 100%;
		display: flex;
		flex-direction: column;
		.rc-tabs-nav {
			display: flex;
			align-items: center;
			.rc-tabs-extra-content {
				padding: 0 13px;
				display: flex;
				align-items: center;
				.td-open-orders-tabs__cancel {
					color: white;
					cursor: pointer;
					:hover {
						color: red;
					}
					svg {
						margin-left: 5px;
					}
				}
			}
			.rc-tabs-nav-wrap {
				flex: 1;
				.rc-tabs-nav-list {
					padding: 0 13px;
					display: flex;
					.rc-tabs-tab {
						font-weight: 500;
						&.rc-tabs-tab-active {
							font-weight: 600;
							.rc-tabs-tab-btn {
								color: #fff;
								border-bottom: 2px solid #2fb67e;
							}
						}
						:not(:last-child) {
							margin-right: 24px;
						}
						.rc-tabs-tab-btn {
							color: #848e9c;

							padding: 5px 0;
							outline: none;
							cursor: pointer;
						}
					}
				}
			}
		}
		.rc-tabs-content-holder {
			flex: 1;
			.rc-tabs-content {
				height: 100%;
				.rc-tabs-tabpane {
					height: 100%;
					outline: none;
					padding: 8px 0;
				}
			}
		}
		.rc-tabs-ink-bar,
		.rc-tabs-nav-operations {
			display: none;
		}
	}
`;

export const TableStyle = styled.table`
	font-size: 13px;
	font-weight: 500;
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;
	color: white;
	thead {
		color: #848e9c;
		tr {
			position: relative;
			th {
				border: none;
				text-align: left;
				font-weight: 500;
			}
		}
	}
	tbody {
		display: block;
		overflow: auto;
		font-size: 12.5px;
		width: 100%;
		height: 260px;
		td {
			border: none;
		}
	}
	tr {
		display: flex;
		th,
		td {
			flex: 1;
			padding: 3px 13px;
			:not(:first-child):not(:last-child) {
				text-align: right;
			}
			:last-child {
				text-align: center;
				svg {
					cursor: pointer;
				}
			}
		}
	}
`;

export const OpenOrdersStyle = styled.div`
	height: 100%;
	font-size: 13px;
	${TableStyle} {
		tr {
			th,
			td {
				:not(:first-child):not(:last-child) {
					text-align: right;
				}
				:last-child {
					text-align: center;
					svg {
						cursor: pointer;
					}
				}
			}
		}
	}
`;

export const OrderHistoryListStyle = styled.div`
	${TableStyle} {
		tbody {
			height: 240px;
		}
		tr {
			th,
			td {
				:first-child {
					flex: 2;
				}
			}
			td {
				.td-order-history-list-executed {
					color: var(#13b887);
				}

				.td-order-history-list-canceled {
					color: var(--system-red);
				}

				.td-order-history-list-opened {
					color: var(--system-yellow);
				}
			}
		}
	}

.flash_red {

	webkit-animation: flash_red 2.5s ; /* Safari 4+ */
	moz-animation:    flash_red 2.5s ; /* Fx 5+ */
	o-animation:      flash_red 2.5s ; /* Opera 12+ */
	animation:        flash_red 2.5s ; /* IE 10+ */	

	}

	@-webkit-keyframes flash_red {
		from { background-color: #ef5350  ; }
		to { background-color: transparent; }
	  }
	  @-moz-keyframes flash_red {
		from { background-color: #ef5350  ; }
		to { background-color: transparent; }
	  }
	  @-o-keyframes flash_red {
		from { background-color: #ef5350  ; }
		
		to { background-color: transparent; }
	  }
	  @keyframes flash_red {
		from { background-color: #ef5350 ; }
		to { background-color: transparent; }
	  }


	@-webkit-keyframes flash_green {
		from { background-color: #13b887 ; }
		to { background-color: transparent; }
	  }
	  @-moz-keyframes flash_green {
		from { background-color: #13b887 ; }
		to { background-color: transparent; }
	  }
	  @-o-keyframes flash_green {
		from { background-color: #13b887 ; }
		to { background-color: transparent; }
	  }
	  @keyframes flash_green {
		from { background-color: #13b887; }
		to { background-color: transparent; }
	  }
`;
