import {showErrorToast, showSuccessToast} from 'src/app/toast';
import messages from 'src/content/messages';

const defaultStatusMap = {
  400: messages.status.bad_request,
  401: messages.status.unauthorized,
  500: messages.status.server_error
};

const xhrToastFn = (showToastFn, fallbackMessageKey) => (response, intl, statusMap={}) => {
  if (response && response.data && response.data.message) {
    showToastFn(response.data.message);
  } else {
    const messageKey = response && (statusMap[response.status] || defaultStatusMap[response.status]);
    showToastFn(intl.formatMessage(messageKey || fallbackMessageKey));
  }
};

export const xhrErrorToast = xhrToastFn(showErrorToast, messages.status.unknown_error);
export const xhrSuccessToast = xhrToastFn(showSuccessToast, messages.status.success);
