import React, { Component } from 'react';

import Country from 'components/common/Country';
import Schema from 'components/common/Schema';
import Collection from 'components/common/Collection';
import Entity from 'components/EntityScreen/Entity';
import FileSize from 'components/common/FileSize';
import Date from 'components/common/Date';

class EntityTableRow extends Component {
  shouldComponentUpdate(nextProps) {
    return !this.props.entity.id || this.props.entity.id !== nextProps.entity.id;
  }

  render() {
    const { entity, hideCollection, documentMode } = this.props;

    return (
      <tr className={`nowrap`}>
        <td className="entity">
          <Entity.Link entity={entity} icon />
        </td>
        {!hideCollection && 
          <td className="collection">
            <Collection.Link collection={entity.collection} icon />
          </td>
        }
        <td className="schema">
          <Schema.Label schema={entity.schema} />
        </td>
        {!documentMode && (
          <td className="country">
            <Country.List codes={entity.countries} />
          </td>
        )}
        <td className="date">
          <Date.Earliest value={entity.dates} />
        </td>
        {documentMode && (
          <td className="file-size">
            <FileSize value={entity.file_size}/>
          </td>
        )}
      </tr>
    );
  }
}

export default EntityTableRow;
