import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { NonIdealState } from '@blueprintjs/core';
import { defineMessages, injectIntl } from 'react-intl';

import Screen from 'components/common/Screen';
import ScreenLoading from 'components/common/ScreenLoading';
import Breadcrumbs from 'components/common/Breadcrumbs';
import DualPane from 'components/common/DualPane';
import CollectionContent from './CollectionContent';
import CollectionInfo from './CollectionInfo';
import Collection from 'components/common/Collection';

const messages = defineMessages({
  not_found: {
    id: 'collection.not_found',
    defaultMessage: 'Collection not found',
  },
});

class CollectionScreen extends Component {
  render() {
    const { collection, intl } = this.props;

    if (collection.error) {
      return (
        <NonIdealState visual="error" title={intl.formatMessage(messages.not_found)} />
      );
    }

    return (
      <Screen breadcrumbs={<Breadcrumbs collection={collection} />}>
        <Helmet>
          <title>{collection.label}</title>
        </Helmet>
        <DualPane>
          <CollectionInfo collection={collection} />
          <CollectionContent collection={collection} />
        </DualPane>
      </Screen>
    );
  }
}

CollectionScreen = injectIntl(CollectionScreen);

// Wrap the CollectionScreen into Collection.Load to handle data fetching.
export default ({ match, ...otherProps }) => (
  <Collection.Load
    id={match.params.collectionId}
    renderWhenLoading={<ScreenLoading />}
  >{collection => (
    <CollectionScreen collection={collection} {...otherProps} />
  )}</Collection.Load>
);
