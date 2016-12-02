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
            <TableHeaderColumn>Delete</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.props.cards.map((card, index) => {
              return (
                <TableRow key={card.id} >
                  <TableRowColumn>{card.phrase}</TableRowColumn>
                  <TableRowColumn>{card.translation}</TableRowColumn>
                  <TableRowColumn>
                    <FontIcon className="material-icons" hoverColor='red' onTouchTap={() => {this.props.handleDelete(card.id);}}>delete</FontIcon>
                  </TableRowColumn>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  }
}

export default CardList;
