import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class CardStack extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.currentCard.phrase}
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 20
            }}
          />
          <CardText expandable={true}>
            {this.props.currentCard.translation}
          </CardText>
          <CardActions >
            <FlatButton 
              label="Previous Phrase" 
              onTouchTap={this.props.handlePrevCard}
              style={{width: '40%'}}
            />
            <FlatButton 
              label="Next Phrase"
              onTouchTap={this.props.handleNextCard}
              style={{width: '40%'}}
            />
            <FontIcon className="material-icons" hoverColor='red' onTouchTap={() => {this.props.handleDelete(this.props.currentCard.id);}}>delete</FontIcon>
          </CardActions>
        </Card>
        <br />
      </div>
    );
  }
}

export default CardStack;
