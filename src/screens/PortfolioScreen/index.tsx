import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../';
import { setDocumentTitle } from '../../helpers';

import Default from "../../ui_vision/views/Dashboard/Default";

class PortfolioComponent extends React.Component<RouterProps, IntlProps> {

    public componentDidMount() {
        setDocumentTitle('Profile');
    }

    public goBack = () => {
        this.props.history.goBack();
    };

    public render() {
        return (
    
           <Default></Default>
        )
        }
}

export const PortfolioScreen = compose(
    injectIntl,
    withRouter,
)(PortfolioComponent) as React.ComponentClass;
