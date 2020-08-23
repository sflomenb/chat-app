import { shallowMount, createLocalVue } from '@vue/test-utils'
import MessageComposer from '@/components/MessageComposer.vue'
import axios from 'axios'
import Vuex from 'vuex'
import store from '@/store'

const factory = (values = {}) => shallowMount(MessageComposer, values)

jest.mock('axios')

beforeEach(() => jest.resetAllMocks())

describe('MessageComposer.vue', () => {
  it('message is empty by default', () => {
    const defaultData = MessageComposer.data()
    expect(defaultData.message).toBe('')
  })
  it('does not post empty message', () => {
    // needed for Vuex
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const wrapper = factory({
      store,
      localVue,
    })

    store.commit('setName', 'Sam')

    wrapper.vm.postMessage()

    expect(axios.post).toHaveBeenCalledTimes(0)
    expect(store.state.chats.length).toEqual(0)
  })
  it('adds message to chat list', async () => {
    // needed for Vuex
    const localVue = createLocalVue()
    localVue.use(Vuex)

    store.commit('setName', 'Sam')

    const wrapper = factory({
      store,
      localVue,
    })

    wrapper.setData({
      message: 'foo',
    })

    axios.post.mockResolvedValue({
      response: {
        data: {
          author: {
            id: 1,
            name: 'Sam',
          },
          content: 'foo',
          creation_time: '2020-08-23T14:54:42.903497Z',
        },
      },
    })

    await wrapper.vm.postMessage()

    expect(axios.post).toHaveBeenCalledTimes(1)
    wrapper.vm.$nextTick().then(() => {
      expect(store.state.chats.length).toEqual(1)
    })
  })
})
