import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearProgress mode="determinate" value={ this.props.completed } />
    );
  }
}

export default ProgressBar;
