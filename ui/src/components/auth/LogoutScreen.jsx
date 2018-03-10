import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import { defineMessages, injectIntl } from 'react-intl';

import {logout} from 'actions/sessionActions';
import {showSuccessToast} from 'app/toast';

const messages = defineMessages({
  success: {
    id: 'logout.success',
    defaultMessage: 'Logout successful',
  },
});

class LogoutScreen extends Component {
  componentWillMount() {
    const {logout, history, intl} = this.props;
    logout();
    showSuccessToast(intl.formatMessage(messages.success));
    history.push('/');
  }

  render() {
    return <div>Logout ...</div>;
  }
}

export default connect(null, {logout})(withRouter(injectIntl(LogoutScreen)));
