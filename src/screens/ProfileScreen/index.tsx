import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../';
import { ProfileApiKeys, ProfileVerification } from '../../containers';
import { ProfileAccountActivity } from '../../containers/ProfileAccountActivity';
import { ProfileAuthDetails } from '../../containers/ProfileAuthDetails';
import { ReferralProgram } from '../../containers/ReferralProgram';
import { setDocumentTitle } from '../../helpers';

import Settings from '../../ui_vision/views/Pages/Account/Settings.js'

class ProfileComponent extends React.Component<RouterProps, IntlProps> {

    public componentDidMount() {
        setDocumentTitle('Profile');
    }

    public goBack = () => {
        this.props.history.goBack();
    };

    public render() {
        return (
            <Settings />
        );
    }
}

export const ProfileScreen = compose(
    injectIntl,
    withRouter,
)(ProfileComponent) as React.ComponentClass;
