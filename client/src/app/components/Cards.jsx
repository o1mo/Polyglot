import React, { Component } from 'react';
import CardStack from './CardStack';
import CardAdd from './CardAdd';
import CardList from './CardList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import NavBar from './NavBar';
import Paper from 'material-ui/Paper';
import axios from 'axios';

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
};

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cards: [
        {id: 'none', phrase: 'You have no cards!', translation: 'Click the "+" below to add a card!'}
      ],
      currentCard: 0
    };
    axios.get('/api/cards')
      .then((resp) => {
        if(resp.data.length > 0){
          this.setState( {cards: resp.data} );
        } else {
          this.setState({cards: [{id: 'none', phrase: 'You have no cards!', translation: 'Click the "+" below to add a card!'}] });
        }
      });
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

  handleDelete(cardId) {
    if(cardId === 'none'){
      return;
    }

    axios.post('/api/cards/delete', {
      cardId: cardId,
    })
      .then((resp) => {
        if(resp.data.length > 0){
          this.setState( {cards: resp.data} );
        } else {
          this.setState({cards: [{id: 'none', phrase: 'You have no cards!', translation: 'Click the "+" below to add a card!'}] });
        }
        this.handleClose();
      });
  }

  handleCreate(phrase, translation) {
    axios.post('/api/cards', {
      phrase: phrase,
      translation: translation
    })
      .then((resp) => {
        this.setState( {cards: resp.data} );
        this.handleClose();
      });

  }

  render() {
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <NavBar />
        </div>
        <h1 style={{textAlign: 'center'}}>Review Vocab</h1>
        <h3 style={{textAlign: 'center'}}>Your vocab stack</h3>
        <div style={{width: '35%', margin: 'auto', marginTop: 50}}>
          <CardStack handleNextCard={this.handleNextCard.bind(this)} handlePrevCard={this.handlePrevCard.bind(this)} currentCard={this.state.cards[this.state.currentCard]} handleDelete={this.handleDelete.bind(this)}/>
        </div>
        <h3 style={{textAlign: 'center'}}>All your vocab</h3>
        <div style={{width: '60%', margin: 'auto', marginTop: 40}}>
          <Paper zDepth={2}>
            <CardList cards={this.state.cards} handleDelete={this.handleDelete.bind(this)}/>
          </Paper>
        </div>
        <FloatingActionButton style={styles.fab} onTouchTap={this.handleOpen.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add a new vocab word"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <CardAdd fromCards={true} handleCreate={this.handleCreate.bind(this)}/>
        </Dialog>
      </div>
    );
  }
}

export default Cards;
