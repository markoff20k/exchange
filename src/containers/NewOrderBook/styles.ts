import styled from 'styled-components';

interface OrderBookProps {
	tabState: 'all' | 'buy' | 'sell';
}

const OrderBookStyleVar = {
	headHeight: '32px',
	tbHeadHeight: '30px',
	tickerHeight: '30px',
};

export const OrderBookStyle = styled.div<OrderBookProps>`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	height: calc(100% - 6px);
	color: white;
	
	font-weight: 500;
	padding: 0 10px;
	background-color: #0b1426;
	.td-order-book {
		background-color: #0b1426;
		height: 100%;
		font-weight: 500;
		padding-top: 10px;
		padding-bottom: 15px;
		&-item__negative {
			color: #ef5350;
		}
		&-item__positive {
			color: #13b887;
		}
		&-tooltip {
			bottom: 200px;
		}
		&-header {
			height: ${OrderBookStyleVar.headHeight};
			svg {
				cursor: pointer;
			}
		}
		&-tbheader {
			height: ${OrderBookStyleVar.tbHeadHeight};
			padding-top: 6px;
			padding-bottom: 6px;
			color: #7a7e8b;
			font-size: 13px;
			filter: brightness(130%);

			> div {
				display: inline-block;
				width: 28%;
				&:last-child,
				&:first-child {
					width: 36%;
				}
			}
		}
		&-ticker {
			height: ${OrderBookStyleVar.tickerHeight};
			margin: 5px 18px !important;
			font-size: 14px;
			&__last-price {
				font-size: 18px;
			}
			&__usd {
				color: #0b1426 ;
			}
		}
		&-table {
			height: ${(props: OrderBookProps) =>
				props.tabState === 'all'
					? `calc(
				(
						100% - ${OrderBookStyleVar.headHeight} - ${OrderBookStyleVar.tickerHeight} -
							${OrderBookStyleVar.tbHeadHeight} - 15px
					) / 2
			)`
					: `calc(100% - ${OrderBookStyleVar.headHeight} - ${OrderBookStyleVar.tickerHeight} - ${OrderBookStyleVar.tbHeadHeight})`};
			display: block;
			thead,
			tbody {
				display: block;
				tr {
					display: block;
					background-color: transparent;
					cursor: pointer;
					:hover {
						background-color: #0b1426 ;
					}
					td,
					th {
						width: 28%;
						display: inline-block;
						text-align: left;
						&:last-child,
						&:first-child {
							width: 36%;
						}
						&:last-child {
							text-align: right;
						}
					}
				}
			}
			tbody {
				height: 100%;
				overflow-y: scroll;
				tr {
					margin-top: 1px;
					margin-bottom: 1px;
					
					webkit-animation: flash_green 2.5s ; /* Safari 4+ */
					moz-animation:    flash_green 2.5s ; /* Fx 5+ */
					o-animation:      flash_green 2.5s ; /* Opera 12+ */
					animation:         flash_green 2.5s ; /* IE 10+ */
					
					
					td {
						height: 100%;
					}
				}
			}
			&.td-reverse-table-body {
				tbody {
					transform: rotate(180deg);
					.td-order-book-table__empty_data {
						transform: rotate(180deg);
						webkit-animation: flash_red 2.5s ; /* Safari 4+ */
						moz-animation:    flash_red 2.5s ; /* Fx 5+ */
						o-animation:      flash_red 2.5s ; /* Opera 12+ */
						animation:         flash_red 2.5s ; /* IE 10+ */						
					}
					tr {
						direction: rtl;
						td {
							transform: rotate(180deg);
						}
					}
				}
			}
		}
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

interface TrProps {
	percentWidth: number;
	placement: 'left' | 'right';
	color: string;
}

export const TrStyle = styled.tr<TrProps>`
	position: relative;
	z-index: 5;
	&:after {
		content: '';
		position: absolute;
		top: 0;
		right: ${(props: TrProps) => (props.placement === 'right' ? 0 : 'unset')};
		bottom: 0;
		left: ${(props: TrProps) => (props.placement === 'left' ? 0 : 'unset')};
		background-color: ${(props: TrProps) => props.color};
		width: ${(props: TrProps) => props.percentWidth}%;
		z-index: -5;
		webkit-animation: flashX 2s ; /* Safari 4+ */
		moz-animation:    flashX 2s ; /* Fx 5+ */
		o-animation:      flashX 2s ; /* Opera 12+ */
		animation:         flashX 2s ; /* IE 10+ */		
	}

	@-webkit-keyframes flashX {
		from { background-color: ${(props: TrProps) => props.color}; }
		to { background-color: transparent; }
	  }
	  @-moz-keyframes flashX {
		from { background-color: ${(props: TrProps) => props.color}; }
		to { background-color: transparent; }
	  }
	  @-o-keyframes flashX {
		from { background-color: ${(props: TrProps) => props.color}; }
		to { background-color: transparent; }
	  }
	  @keyframes flashX {
		from { background-color: ${(props: TrProps) => props.color}; }
		to { background-color: transparent; }
	  }
	
`;
