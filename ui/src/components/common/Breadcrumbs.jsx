import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Collection from 'components/common/Collection';
import './Breadcrumbs.css';

class Breadcrumbs extends Component {
  render() {
    const { collection, children, app } = this.props;

    let collectionCrumbs = [];
    if (collection) {
      collectionCrumbs.push((
        <li key='collection'>
          <Collection.Link collection={collection} className="pt-breadcrumb" icon />
        </li>
      ));
    }

    return (
      <nav className="Breadcrumbs">
        <ul className="pt-breadcrumbs">
          <li key='root'>
            <Link to="/" className="pt-breadcrumb">
              { app.title }
            </Link>
          </li>
          {collectionCrumbs}
          {children}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  app: state.metadata.app,
});

export default connect(mapStateToProps)(Breadcrumbs);
