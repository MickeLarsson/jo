export const increment = (pl) => {
  return {
    type: 'INCREMENT',
    player: pl
  }
}

export const decrement = (pl) => {
  return {
    type: 'DECREMENT',
    player: pl
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
