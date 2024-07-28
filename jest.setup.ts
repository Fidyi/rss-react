import '@testing-library/jest-dom';
beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: '1',
        name: 'Bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        types: [{ slot: 1, type: { name: 'grass', url: '' } }],
        abilities: [
          { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
        ],
        stats: [{ base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } }],
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
      }),
  })
) as jest.Mock;
