export default (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  if ( action.type === 'app/GET_ID' ) {
    newState.myId = action.myId;
  } else if ( action.type === 'app/ENTER_LAUNCH' ) {
    newState.teacher = action.teacher;
    newState.view = 1;
  } else if ( action.type === 'app/ENTER_CHAT' ) {
    newState.language = action.language;
    newState.view = 2;
  } else if ( action.type === 'app/EXIT_CHAT' ) {
    newState.language = null;
    newState.teacher = null;
    newState.view = 4;
  } else if ( action.type === 'app/ENTER_CARDS' ) {
    newState.view = 3;
  } else if ( action.type === 'app/ADD_PAIR' ) {
    newState.pairId = action.pairId;
  } else if ( action.type === 'app/RESET' ) {
    newState.pairId = null;
    newState.view = 0;
  }
  return newState;
};
