import React, { Component } from 'react';
import CardStack from './CardStack';
import CardAdd from './CardAdd';
import CardList from './CardList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import NavBar from './NavBar';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cards: [
        {word: 'testWord', translation:'translatedTestWord'},
        {word: 'this is a word', translation:'this is a translation'},
        {word: 'these words', translation:'these translations'}
      ],
      currentCard: 0
    };
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  handleNextCard () {
    if(this.state.currentCard < this.state.cards.length - 1){
      this.setState({currentCard: this.state.currentCard + 1});
    }
  }

  handlePrevCard () {
    if(this.state.currentCard > 0){
      this.setState({currentCard: this.state.currentCard - 1});
    }
  }

  render() {
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <NavBar />
        </div>
        <CardStack handleNextCard={this.handleNextCard.bind(this)} handlePrevCard={this.handlePrevCard.bind(this)} currentCard={this.state.cards[this.state.currentCard]}/>
        <CardList cards={this.state.cards} />
        <FloatingActionButton style={{color: 'white'}} onTouchTap={this.handleOpen.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add a new vocab word"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <CardAdd />
        </Dialog>
      </div>
    );
  }
}

export default Cards;
