import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';


class CardList extends Component {
  render() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow>
            <TableHeaderColumn>Phrase</TableHeaderColumn>
            <TableHeaderColumn>Translation</TableHeaderColumn>
            <TableHeaderColumn>Edit</TableHeaderColumn>
            <TableHeaderColumn>Delete</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.props.cards.map((card, index) => {
              return (
                <TableRow>
                  <TableRowColumn>{card.word}</TableRowColumn>
                  <TableRowColumn>{card.translation}</TableRowColumn>
                  <FontIcon className="material-icons" hoverColor='red'>edit</FontIcon>
                  <FontIcon className="material-icons" hoverColor='red'>delete</FontIcon>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  }
}

export default CardList;
