import React, { Component } from 'react';

import DualPane from 'components/common/DualPane';
import EntitySearch from 'components/EntitySearch/EntitySearch';

class CollectionContent extends Component {
  render() {
    const { collection } = this.props;
    const context = {
      'filter:collection_id': collection.id
    };
    return (
      <DualPane.ContentPane>
        <EntitySearch context={context} hideCollection={true} />
      </DualPane.ContentPane>
    );
  }
}

export default CollectionContent;
