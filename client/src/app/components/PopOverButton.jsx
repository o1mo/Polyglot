import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  container: {
    margin: '-30px 20px 20px 0px',
    textAlign: 'right',
  },
  menuItem: {
    margin: '0px 0px 0px 0px',
    textAlign: 'right',
  }
};

class PopoverButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap(e) {
    // This prevents ghost click.
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div style={style.container}>
        <RaisedButton
          onTouchTap={this.handleTouchTap.bind(this)}
          label={ this.props.name }
          primary />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}>
          <Menu>
            {this.props.friends.map((friend, key)=>{
              return <MenuItem style={style.menuItem} key={key} primaryText={ friend } />;
            })}
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default PopoverButton;