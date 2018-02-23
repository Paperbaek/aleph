import React, { Component } from 'react';
import {connect} from "react-redux";

import Screen from 'src/components/common/Screen';
import Breadcrumbs from 'src/components/common/Breadcrumbs';
import DualPane from 'src/components/common/DualPane';
import CollectionBrowser from '../../../components/CollectionScreen/CollectionBrowser';

class CollectionsScreen extends Component {
  render() {
    const { app } = this.props;
    return (
        <Screen>
          <Breadcrumbs collection={{label: 'Collections', links: {ui: app.ui_uri + '/collections'}}}/>
          <DualPane>
            <DualPane.ContentPane>
              <CollectionBrowser />
            </DualPane.ContentPane>
          </DualPane>
        </Screen>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.metadata.app
  };
};

export default connect(mapStateToProps)(CollectionsScreen);
