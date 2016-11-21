export default (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  if ( action.type === 'app/ENTER_LAUNCH' ) {
    newState.teacher = action.teacher;
    newState.view = 1;
  } else if ( action.type === 'app/ENTER_CHAT' ) {
    newState.myId = action.myId;
    newState.language = action.language;
    newState.view = 2;
  } else if ( action.type === 'app/EXIT_CHAT' ) {
    newState.language = null;
    newState.teacher = null;
    newState.view = 0;
  }
  return newState;
};

