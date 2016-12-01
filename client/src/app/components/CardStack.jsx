import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class CardStack extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.currentCard.word}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            {this.props.currentCard.translation}
          </CardText>
          <CardActions>
            <FlatButton 
              label="Previous Phrase" 
              onTouchTap={this.props.handlePrevCard}
            />
            <FlatButton 
              label="Next Phrase"
              onTouchTap={this.props.handleNextCard}
            />
          </CardActions>
        </Card>
        <br />
      </div>
    );
  }
}

export default CardStack;
