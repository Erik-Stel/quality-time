import React, { useState } from 'react';
import { Button, Popup, Table } from 'semantic-ui-react';
import { SourceEntity } from './SourceEntity';
import { capitalize } from '../utils';

export function SourceEntities(props) {
  const [hideIgnoredEntities, setHideIgnoredEntities] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('ascending');

  function sort(column) {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "ascending" ? "descending" : "ascending")
    } else {
      setSortColumn(column)
    }
  }
  function sorted(column) {
    return column === sortColumn ? sortDirection : null
  }

  const report_source = props.metric.sources[props.source.source_uuid];
  const source_type = report_source.type;
  const metric_entities = props.datamodel.sources[source_type].entities[props.metric.type];
  if (!metric_entities || !Array.isArray(props.source.entities) || props.source.entities.length === 0) {
    return null;
  }
  const entity_attributes = metric_entities.attributes;
  const entity_name = metric_entities.name;
  const entity_name_plural = metric_entities.name_plural;
  const headers =
    <Table.Row>
      <Table.HeaderCell collapsing textAlign="center">
        <Popup trigger={
          <Button
            basic
            compact
            icon={hideIgnoredEntities ? 'unhide' : 'hide'}
            onClick={() => setHideIgnoredEntities(!hideIgnoredEntities)}
            primary
          />
        } content={hideIgnoredEntities ? `Show resolved ${entity_name_plural}` : `Hide resolved ${entity_name_plural}`} />
      </Table.HeaderCell>
      <Table.HeaderCell sorted={sorted("entity_status")} onClick={() => sort("entity_status")}>
        {`${capitalize(entity_name)} status`}</Table.HeaderCell>
      {entity_attributes.map((entity_attribute) =>
        <Table.HeaderCell key={entity_attribute.key} sorted={sorted(entity_attribute.key)} onClick={() => sort(entity_attribute.key)}>
          {entity_attribute.name}
        </Table.HeaderCell>)
      }
    </Table.Row>
  let entities = Array.from(props.source.entities);
  if (sortColumn !== null) {
    entities.sort((a, b) => a[sortColumn] < b[sortColumn] ? -1 : 1)
    if (sortDirection === 'descending') {
      entities.reverse()
    }
  }
  const rows = entities.map((entity) =>
    <SourceEntity
      entity={entity}
      entity_attributes={entity_attributes}
      entity_name={entity_name}
      hide_ignored_entities={hideIgnoredEntities}
      key={entity.key}
      metric_uuid={props.metric_uuid}
      reload={props.reload}
      status={
        props.source.entity_user_data && props.source.entity_user_data[entity.key] &&
          props.source.entity_user_data[entity.key].status ? props.source.entity_user_data[entity.key].status : "unconfirmed"}
      rationale={
        props.source.entity_user_data && props.source.entity_user_data[entity.key] &&
          props.source.entity_user_data[entity.key].rationale ? props.source.entity_user_data[entity.key].rationale : ""}
      source_uuid={props.source.source_uuid}
    />);
  return (
    <Table sortable size='small'>
      <Table.Header>
        {headers}
      </Table.Header>
      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  )
}
