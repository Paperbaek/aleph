import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Tab, Tabs } from "@blueprintjs/core";

import Property from './Property';
import Entity from './Entity';
import EntityInfoTags from './EntityInfoTags';
import DualPane from 'components/common/DualPane';
import Schema from 'components/common/Schema';
import CollectionInfo from 'components/common/Collection/CollectionInfo';
import { fetchEntityReferences } from 'actions/index';
import { getEntityTags } from 'selectors';

class EntityInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabId: 'overview'
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  
  handleTabChange(activeTabId: TabId) {
    this.setState({ activeTabId });
  }
  
  componentDidMount() {
    const { entity } = this.props;
    if(!this.props.references && entity && entity.id) {
      this.props.fetchEntityReferences(entity);
    }
  }

  render() {
    const { references, entity } = this.props;
  
    return (
      <DualPane.InfoPane className="EntityInfo with-heading">
        <div className="pane-heading">
          <span>
            <Schema.Label schema={entity.schema} icon={true} />
          </span>
          <h1>
            <Entity.Label entity={entity} addClass={true}/>
          </h1>
        </div>
        <div className="pane-content">
          <Tabs id="EntityInfoTabs" large="true" onChange={this.handleTabChange} selectedTabId={this.state.activeTabId}>
              <Tab id="overview" 
                title={
                  <React.Fragment>
                    <span className="pt-icon-standard pt-icon-info-sign"/>
                    <FormattedMessage id="entity.info.overview" defaultMessage="Overview"/>
                  </React.Fragment>
                }
                panel={
                  <React.Fragment>
                    <h2>
                      <FormattedMessage 
                        id="entity.references.title"
                        defaultMessage="Relationships"/>
                    </h2>
                    { (references && references.results && !!references.results.length && (
                      <ul className="info-rank">
                        { references.results.map((ref) => (
                          <li key={ref.property.qname}>
                            <span className="key">
                              <Schema.Icon schema={ref.schema} />{' '}
                              <Property.Reverse model={ref.property} />
                            </span>
                            <span className="value">
                              <FormattedNumber value={ref.count} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )) ||
                      <p className="pt-text-muted">
                        <FormattedMessage 
                          id="entity.references.empty.description"
                          defaultMessage="There are no known relationships."/>
                      </p>
                    }
                  </React.Fragment>
                }
              />
              <Tab id="source" 
                title={
                  <React.Fragment>
                    <span className="pt-icon-standard pt-icon-database"/>
                    <FormattedMessage id="entity.info.source" defaultMessage="Source"/>
                  </React.Fragment>
                }
                panel={<CollectionInfo collection={entity.collection}/>}
              />
              <Tab id="tags"
                title={
                  <React.Fragment>
                    <span className="pt-icon-standard pt-icon-tag"/>
                    <FormattedMessage id="entity.info.links" defaultMessage="Links"/>
                  </React.Fragment>
                }
                panel={<EntityInfoTags entity={entity} />}
              />
              <Tabs.Expander />
          </Tabs>
        </div>
      </DualPane.InfoPane>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    references: state.entityReferences[ownProps.entity.id],
    schema: state.metadata.schemata[ownProps.entity.schema],
    tags: getEntityTags(state, ownProps.entity.id)
  };
};

export default connect(mapStateToProps, {fetchEntityReferences})(EntityInfo);
