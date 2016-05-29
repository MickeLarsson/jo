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
