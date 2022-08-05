import classnames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Link } from 'react-router-dom';
import { kycSteps } from '../../api';
import { changeElementPosition } from '../../helpers/changeElementPosition';
import { Label, labelFetch, selectLabelData, selectUserInfo, User } from '../../modules';

/* Icons */
import { CheckBigIcon } from '../../assets/images/kyc/CheckBigIcon';
import { CheckIcon } from '../../assets/images/kyc/CheckIcon';
import { ClocksIcon } from '../../assets/images/kyc/ClocksIcon';
import { CrossIcon } from '../../assets/images/kyc/CrossIcon';

import  Card  from "../../ui_vision/components/Card/Card";

interface ReduxProps {
	labels: Label[];
}

interface DispatchProps {
	labelFetch: typeof labelFetch;
}

interface ProfileVerificationProps {
	user: User;
}

interface State {
	isMouseTooltipVisible: boolean;
}

type Props = DispatchProps & ProfileVerificationProps & ReduxProps;

class ProfileVerificationComponent extends React.Component<Props, State> {
	public state = {
		isMouseTooltipVisible: false,
	};

	public componentDidMount() {
		this.props.labelFetch();
	}


	public renderVerificationLabel(labels: Label[], labelToCheck: string, index: number) {
		const { isMouseTooltipVisible } = this.state;
		const targetLabelStatus = this.handleCheckLabel(labels, labelToCheck);

		const tooltipClass = classnames('pg-profile-page-verification-labels__step__tooltip tooltip-hover', {
			'tooltip-hover--visible': isMouseTooltipVisible,
		});

		switch (targetLabelStatus) {
			case 'verified':
				return (
					<Card>
					<div key={index} className="pg-profile-page-verification-labels__step pg-profile-page-verification-labels__step--verified">
						<div className="pg-profile-page-verification-labels__step__info">
							<div className="pg-profile-page-verification-labels__step__info__title">
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.title`} />

							</div>
							
							<div className="pg-profile-page-verification-labels__step__info__subtitle">
								<div></div>
								 Negociação de criptoativos
								<div></div>
								Transações bancárias
								<div></div>
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.subtitle`} />
							</div>
						</div>
						<div className="pg-profile-page-verification-labels__step__label pg-profile-page-verification-labels__step__label--verified">
							<FormattedMessage id="page.body.profile.verification.verified" />
							<CheckBigIcon />
						</div>
					</div>
					</Card>
				);
			case 'drafted':
			case 'pending':
			case 'submitted':
				
				return (
					<Card> 
					<div key={index} className="pg-profile-page-verification-labels__step pg-profile-page-verification-labels__step--pending">
						<div className="pg-profile-page-verification-labels__step__info">
							<div className="pg-profile-page-verification-labels__step__info__title">
								
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.title`} />
							</div>
							<div className="pg-profile-page-verification-labels__step__info__subtitle">
							<div></div>
								 Negociação de criptoativos
								<div></div>
								Transações bancárias
								<div></div>								
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.subtitle`} />
							</div>
						</div>
						<div className="pg-profile-page-verification-labels__step__label pg-profile-page-verification-labels__step__label--pending">
							<FormattedMessage id="page.body.profile.verification.pending" />
							<ClocksIcon />
						</div>
					</div>
					</Card>
				);
			case 'rejected':
				return (
					<Card>
					<div key={index} className="pg-profile-page-verification-labels__step pg-profile-page-verification-labels__step--rejected">
						<div className="pg-profile-page-verification-labels_step__info">
							<div className="pg-profile-page-verification-labels_step__info__title">
								
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.title`} />
							</div>
							<div className="pg-profile-page-verification-labels__step__info__subtitle">
							<div></div>
								 Negociação de criptoativos
								<div></div>
								Transações bancárias
								<div></div>
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.subtitle`} />
							</div>
						</div>
						<div
							className="pg-profile-page-verification-labels__step__label pg-profile-page-verification-labels__step__label--rejected"
							onMouseEnter={e => this.handleHoverTooltipIcon()}
							onMouseLeave={e => this.handleToggleTooltipVisible()}
						>
							<Link to="/banner/authentication/confirm/basic">
								<FormattedMessage id="page.body.profile.verification.reverify" />
							</Link>
							<CrossIcon />
						</div>
						<span className={tooltipClass}>
							<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.rejected.tooltip`} />
						</span>
					</div>
					</Card>
				);
			case 'blocked':
				return (
					<Card>
					<div key={index} className="pg-profile-page-verification-labels__step pg-profile-page-verification-labels__step--blocked">
						<div className="pg-profile-page-verification-labels__step__info">
							<div className="pg-profile-page-verification-labels__step__info__title">
					
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.title`} />
							</div>
							<div className="pg-profile-page-verification-labels__step__info__subtitle">
							<div></div>
								 Negociação de criptoativos
								<div></div>
								Transações bancárias
								<div></div>
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.subtitle`} />
							</div>
						</div>
						<div className="pg-profile-page-verification-labels__step__button pg-profile-page-verification-labels__step__button--blocked">
							<Link to="/banner/authentication/confirm/basic">
								<FormattedMessage id="page.body.profile.verification.verify" />
							</Link>
						</div>
					</div>
					</Card>
				);
			default:
				return (
					<Card>
					<div key={index} className="pg-profile-page-verification-labels__step pg-profile-page-verification-labels__step--active">
						<div className="pg-profile-page-verification-labels__step__info">
							<div className="pg-profile-page-verification-labels__step__info__title">
				
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.title`} />
							</div>
							<div className="pg-profile-page-verification-labels__step__info__subtitle">
							<div></div>
								 Negociação de criptoativos
								<div></div>
								Transações bancárias
								<div></div>
								<FormattedMessage id={`page.body.profile.verification.${labelToCheck}.subtitle`} />
							</div>
						</div>
						<div className="pg-profile-page-verification-labels__step__button pg-profile-page-verification-labels__step__button--active">
							<Link to="/banner/authentication/confirm/basic">
								<FormattedMessage id="page.body.profile.verification.verify" />
							</Link>
						</div>
					</div>
					</Card>
				);
		}
	}

	public render() {
		const { labels } = this.props;

		return (
			<div className="pg-profile-page-verification-labels">

				{kycSteps().map((step: string, index: number) => this.renderVerificationLabel(labels, step, index))}
			</div>
		);
	}

	private handleCheckLabel = (labels: Label[], labelToCheck: string) => {
		const targetLabel =
			labels.length && labels.find((label: Label) => label.key === labelToCheck && label.scope === 'private');
		let targetLabelStatus = targetLabel ? targetLabel.value : '';
		const indexOfPrevStep = kycSteps().indexOf(labelToCheck) - 1;

		if (indexOfPrevStep !== -1) {
			const prevStepPassed = Boolean(
				labels.find(
					(label: Label) =>
						label.key === kycSteps()[indexOfPrevStep] && label.value === 'verified' && label.scope === 'private',
				),
			);

			if (!prevStepPassed) {
				targetLabelStatus = 'blocked';
			}
		}

		return targetLabelStatus;
	};

	private handleToggleTooltipVisible = () => {
		this.setState(prevState => ({
			isMouseTooltipVisible: !prevState.isMouseTooltipVisible,
		}));
	};

	private handleHoverTooltipIcon = () => {
		changeElementPosition('pg-profile-page-verification-labels__step__tooltip', 0, -100, 20);
		this.handleToggleTooltipVisible();
	};
}

const mapStateToProps = state => ({
	user: selectUserInfo(state),
	labels: selectLabelData(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
	labelFetch: () => dispatch(labelFetch()),
});

export const ProfileVerificationLabels = connect(mapStateToProps, mapDispatchProps)(ProfileVerificationComponent);
