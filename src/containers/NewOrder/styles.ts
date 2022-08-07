import styled from 'styled-components';

export const OrderStyle = styled.div`
	font-weight: 500;
	font-size: 13px;
	height: 100%;
	background-color: #0b1426;
	padding: 10px;
	.rc-tabs {
		display: flex;
		flex-direction: column;
		height: 100%;
		.rc-tabs-tabpane {
			outline: none;
		}
		.rc-tabs-nav {
			display: flex;
			border-bottom: 1px solid #2b2e3d;
			.rc-tabs-extra-content {
				height: auto;
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					color: #848e9c;
					margin-right: 5px;
				}
				button {
					outline: none;
					padding: 5px 10px;
					background-color: #2fb67e;
					color: #fff;
					border: none;
					border-radius: 2px;
				}
			}
			.rc-tabs-nav-wrap {
				flex: 1;
				.rc-tabs-nav-list {
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
							margin-right: 32px;
						}
						.rc-tabs-tab-btn {
							color: #848e9c;
							font-size: 14px;
							padding: 10px 0;
							outline: none;
							cursor: pointer;
						}
					}
				}
			}
		}
		.rc-tabs-ink-bar,
		.rc-tabs-nav-operations {
			display: none;
		}
		.rc-tabs-content-holder {
			flex: 1;
			.rc-tabs-content {
				height: 100%;
				.rc-tabs-tabpane {
					height: 100%;
				}
				.content-form-wrapper {
					.content-form-buy,
					.content-form-sell {
						padding: 10px 0;
						.title-block {
							.title-block-left {
								color: white;
								font-size: 13px;
								display: flex;
								align-items: center;
							}
							.title-block-right {
								font-size: 13px;
								display: flex;
								justify-content: flex-end;
								align-items: center;
							}
						}
						.input-group {
							background-color: transparent;
							border: 1px solid #7a7e8b;
							border-radius: 2px;
							input,
							span {
								background: transparent;
								font-size: 13px;
								outline: none;
								border: none;
							}
							::first-child {
								margin-bottom: 10px;
							}
							.input-group-prepend {
								span {
									color: #fff;
								}
							}
							.form-control {
								color: #fff;
								height: unset;
								box-shadow: none;
							}
							.input-group-prepend,
							.input-group-append {
								width: 80px;
								.input-group-text {
									display: block;
									text-align: center;
									padding: 5px 14px;
								}
							}
							.input-group-append {
								width: 70px;
								span {
									color: #848e9c;
								}
							}
						}
						.ant-slider {
							width: 97%;
							margin: 20px auto;
							.ant-slider-rail {
								background-color: #282b3a;
							}
							.ant-slider-handle {
								background-color: #848e9c;
								border: solid 3px #fff;
							}
						}
						.submit-order {
							font-size: 13px;
							border-radius: 2px;
							span {
								font-weight: bold;
								color: #fff;
							}
						}
						.logger-order {
							
							border: 1px solid #1EBDB2;
							border-radius: 5px;
							height: 32px;
							background-color: transparent;

							span {
								margin: 0 5px;
								line-height: 32px;
							}
							a {
								font-size: 15px;
								color: white;
								line-height: 32px;
								:hover {
									background-color: transparent;
									color: white;
								}
							}
						}
					}
					.content-form-buy {
						padding-right: 20px;
						.submit-order {
							background: #13b887;
							font-weight: 350;
							font-size: 14px;
							filter: brightness(110%);
						}
					}
					.content-form-sell {
						padding-left: 20px;
						.submit-order {
							background: #ef5350;
							font-weight: 350;
							font-size: 14px;
							filter: brightness(110%);							
						}
					}
				}
			}
		}
	}
`;
