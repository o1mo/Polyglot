import React from 'react';
import Chip from 'material-ui/Chip';

/**
 * An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array.
 * Note that since no `onTouchTap` property is defined, the Chip can be focused, but does not gain depth
 * while clicked or touched.
 */
const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

export default class LearningChips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chipData: [
      {key: 0, label: 'English'},
      {key: 1, label: 'Spanish'},
      {key: 2, label: 'Chinese'},
      {key: 3, label: 'Arabic'},
    ]};
  }

  handleRequestDelete = (key) => {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({chipData: this.chipData});
  };

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={ styles.chip }>
        {data.label}
      </Chip>
    );
  }

  render() {
    return (
      <div style={ styles.wrapper }>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    );
  }
}
