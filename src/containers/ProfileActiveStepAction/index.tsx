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
import { userSaga } from 'modules/user/profile/sagas/userSaga';

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

class ProfileActiveStepActionComponent extends React.Component<Props, State> {
	public state = {
		isMouseTooltipVisible: true,
	};

	public componentDidMount() {
		this.props.labelFetch();
	}

	public renderKYCLevel = () => {
		
		const kycLevel = this.props.user.level;
		

		switch (kycLevel) {
			case 1:
				return (
					<div>
						Valide sua id
					</div>
				);
			case 2:
				return (
					<div>
						Valide seus docs
						<ClocksIcon />
					</div>
				);
			case 3:
				return (
					<div>
						Valide seu IR
						<CrossIcon />
					</div>
				);
			default:
				return ( 
					<div>
						Negocie ja
					</div>
				);
		}
	};

	public render() {
	
		return (
			<div className="pg-profile-page__box pg-profile-page-verification">
				{this.renderKYCLevel()}
			</div>
		);
	}

}

const mapStateToProps = state => ({
	user: selectUserInfo(state),
	labels: selectLabelData(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
	labelFetch: () => dispatch(labelFetch()),
});

export const ProfileActiveStepAction = connect(mapStateToProps, mapDispatchProps)(ProfileActiveStepActionComponent);
