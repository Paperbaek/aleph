import React, { Component } from 'react';
import {connect} from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { Button, MenuItem, Position, Classes, Alignment } from "@blueprintjs/core";
import { Select as BlueprintSelect } from "@blueprintjs/select";

import { suggestRoles } from 'actions';

import './Role.css';

const messages = defineMessages({
  label: {
    id: 'role.select.user',
    defaultMessage: 'Choose a user',
  },
  suggest_initial: {
    id: 'role.begin.typing',
    defaultMessage: 'Search by name or email',
  },
  no_results: {
    id: 'role.no.results',
    defaultMessage: 'No match, keep typing',
  }
});


class Label extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    const { role, icon = true } = this.props;

    return (
      <span>
        { icon && (<i className='fa fa-fw fa-user-circle-o' />) }
        { role.name }
      </span>
    );
  }
}


class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      suggested: [],
    };
    this.renderRole = this.renderRole.bind(this);
    this.onSuggest = this.onSuggest.bind(this);
    this.onSelectRole = this.onSelectRole.bind(this);
  }

  async onSuggest(query) {
    if (query.length <= 3) {
      return;
    }
    const { exclude = [] } = this.props;
    const roles = await this.props.suggestRoles(query, exclude);
    this.setState({
      suggested: roles.results
    })
  }

  onSelectRole(role) {
    this.props.onSelect(role);
  }

  renderRole(role, { handleClick, modifiers }) {
    return <MenuItem
              className={modifiers.active ? Classes.ACTIVE : ""}
              key={role.id}
              onClick={handleClick}
              text={role.name}
      />;
  }

  render () {
    const { intl, role } = this.props;
    const { suggested } = this.state;
    const label = role ? role.name : intl.formatMessage(messages.label);
  
    return <BlueprintSelect
              initialContent={
                <MenuItem disabled={true} text={intl.formatMessage(messages.suggest_initial)} />
              }
              noResults={
                <MenuItem disabled={true} text={intl.formatMessage(messages.no_results)} />
              }
              itemRenderer={this.renderRole}
              items={suggested}
              onItemSelect={this.onSelectRole}
              onQueryChange={this.onSuggest}
              popoverProps={{
                position: Position.BOTTOM_LEFT,
                className: "RoleSelect",
              }}
              filterable={true}
              resetOnClose={true}
              resetOnSelect={true}>
      <Button text={label}
              className="pt-fill"
              aligntext={Alignment.LEFT}
              rightIcon="search" />
    </BlueprintSelect>;
  }  
}


class Role {
  static Label = Label;
  static Select = connect(null, {suggestRoles})(injectIntl(Select));;
}

export default Role;
