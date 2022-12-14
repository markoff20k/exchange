import classnames from 'classnames';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { kycSteps } from '../../api';
import { Address, Documents, Identity } from '../../containers';
import { getVerificationStep, setDocumentTitle } from '../../helpers';
import { IntlProps } from '../../index';
import { Label, labelFetch, RootState, selectLabelData, selectSidebarState } from '../../modules';

interface ReduxProps {
	isSidebarOpen: boolean;
	labels: Label[];
}

interface DispatchProps {
	labelFetch: typeof labelFetch;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

class ConfirmComponent extends React.Component<Props> {
	public componentDidMount() {
		const { labels } = this.props;
		setDocumentTitle('Confirm');
		this.props.labelFetch();

		if (labels.length) {
			this.handleCheckUserLabels(labels);
		}
	}

	public componentDidUpdate(prevProps: Props) {
		const { labels } = this.props;

		if (labels.length && JSON.stringify(labels) !== JSON.stringify(prevProps.labels)) {
			this.handleCheckUserLabels(labels);
		}
	}

	public renderVerificationStep = (step: string) => {
		switch (step) {
			case 'profile':
				return <Identity />;
			case 'document':
				return <Documents />;
			case 'address':
				return <Address />;
			default:
				return ( <div> {step} </div>);
		}
	};
	

	public render() {
		const { isSidebarOpen } = this.props;
		const step = this.handleGetVerificationStep();
		const Logo = require('../../assets/images/logo_branca_bandeira_verde.svg');
		const containerClass = classnames('pg-confirm');

		return (
			<div className={containerClass}>
				<div className="pg-confirm__logo">
					<img src={Logo} alt="" className="pg-logo__img" />
					
				</div>
				<h3 className="pg-confirm__title">
					<FormattedMessage id={`page.confirm.title.${step}`} />
				</h3>
				<h6 className="pg-confirm__subtitle">
					<FormattedMessage id={`page.confirm.subtitle.${step}`} />
				</h6>
				<div className="pg-confirm__content">{this.renderVerificationStep(step)}</div>
			</div>
		);
	}

	private handleGetVerificationStep = (): string => {
		const { labels } = this.props;

		return getVerificationStep(labels);
	};

	private handleCheckUserLabels = (labels: Label[]) => {
		const pendingLabelExists = Boolean(
			labels.find(
				label =>
					kycSteps().includes(label.key) &&
					['pending', 'drafted', 'submitted'].includes(label.value) &&
					label.scope === 'private',
			),
		);
		const passedSteps = kycSteps().filter((step: string) =>
			labels.find(label => step === label.key && label.value === 'verified' && label.scope === 'private'),
		);

		if (pendingLabelExists || kycSteps().length === passedSteps.length) {
			this.props.history.push('/profile');
		}
	};
}

const mapStateToProps = (state: RootState): ReduxProps => ({
	isSidebarOpen: selectSidebarState(state),
	labels: selectLabelData(state),
});

const mapDispatchToProps = dispatch => ({
	labelFetch: () => dispatch(labelFetch()),
});

export const ConfirmScreen = compose(
	injectIntl,
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(ConfirmComponent) as any; // tslint:disable-line
