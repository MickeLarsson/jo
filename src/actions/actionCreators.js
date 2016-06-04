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

export const setName = (player, name) => {
  return {
    type: 'SET_NAME',
    player,
    name
  }
}

export const getPeople = () => {
  return {
    type: 'GET_PEOPLE'
  }
}

export const selectPlayer = (label, pl) => {
  return {
    type: 'SELECT_PLAYER',
    label,
    pl
  }
}
