export const increment = (side) => {
  console.log('inc ' + side);
  return {
    type: 'INCREMENT',
    side
  }
}

export const decrement = (side) => {
  return {
    type: 'DECREMENT',
    side
  }
}

export const getPeople = () => {
  return {
    type: 'GET_PEOPLE'
  }
}

export const selectPlayer = (id, label) => {
  return {
    type: 'SELECT_PLAYER',
    label,
    id
  }
}

export const setServer = (side) => {
  return {
    type: 'SET_SERVER',
    side
  }
}

export const setServerSet = () => {
  return {
    type: 'server/SERVER_SET'
  }
}
