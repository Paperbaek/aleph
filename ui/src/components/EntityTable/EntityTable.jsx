import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import EntityTableRow from './EntityTableRow';
import SortableTH from 'components/common/SortableTH';

const messages = defineMessages({
  column_name: {
    id: 'entity.column.name',
    defaultMessage: 'Name',
  },
  column_collection_id: {
    id: 'entity.column.collection_id',
    defaultMessage: 'Collection',
  },
  column_schema: {
    id: 'entity.column.schema',
    defaultMessage: 'Type',
  },
  column_countries: {
    id: 'entity.column.countries',
    defaultMessage: 'Countries',
  },
  column_file_size: {
    id: 'entity.column.file_size',
    defaultMessage: 'Size',
  },
  column_dates: {
    id: 'entity.column.dates',
    defaultMessage: 'Date',
  },
});

class EntityTable extends Component {
  sortColumn(field) {
    const { query, updateQuery } = this.props;
    const { field: sortedField, desc } = query.getSort();
    // Toggle through sorting states: ascending, descending, or unsorted.
    let newQuery;
    if (sortedField !== field) {
      newQuery = query.sortBy(field, false);
    } else {
      if (!desc) {
        newQuery = query.sortBy(field, true);
      } else {
        newQuery = query.sortBy(null);
      }
    }
    updateQuery(newQuery);
  }

  render() {
    const { result, query, intl } = this.props;
    const { hideCollection = false, documentMode = false } = this.props;

    if (!result || !result.results || result.total === 0) {
      return null;
    }

    const TH = ({ sortable, field, ...otherProps }) => {
      const { field: sortedField, desc } = query.getSort();
      return (
        <SortableTH sortable={sortable}
                    sorted={sortedField === field && (desc ? 'desc' : 'asc')}
                    onClick={() => this.sortColumn(field)}
                    {...otherProps}>
          {intl.formatMessage(messages[`column_${field}`])}
        </SortableTH>
      );
    }

    return (
      <table className="data-table">
        <thead>
          <tr>
            <TH field="name" className="wide" sortable={true} />
            {!hideCollection && 
              <TH field="collection_id" />
            }
            <TH field="schema" />
            {!documentMode && (
              <TH field="countries" sortable={true} />
            )}
            <TH field="dates" sortable={true} />
            {documentMode && (
              <TH field="file_size" sortable={true} />
            )}
          </tr>
        </thead>
        <tbody>
          {result.results.map(entity =>
            <EntityTableRow key={entity.id}
                            entity={entity}
                            hideCollection={hideCollection}
                            documentMode={documentMode} />
          )}
        </tbody>
      </table>
    );
  }
}

export default injectIntl(EntityTable);
