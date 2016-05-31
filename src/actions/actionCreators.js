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
