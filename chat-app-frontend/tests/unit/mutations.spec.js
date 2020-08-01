import { mutations } from '@/store'

const { setName } = mutations

describe('mutations', () => {
  it('sets the name', () => {
    // mock state
    const state = { name: '' }
    // apply mutation
    setName(state, 'Sam')
    // assert result
    expect(state.name).toEqual('Sam')
  })
})
