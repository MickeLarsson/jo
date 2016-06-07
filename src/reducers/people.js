import persons from '../data/people';

const people = (state = [], action) => {
  switch (action.type){
    case 'GET_PEOPLE':
      return persons;
    default:
      return state;
  }
}

export default people;

export const getPerson = (state, id) =>
  state.find((x) => x.id === id) || {first: '', last: '', id: ''};
