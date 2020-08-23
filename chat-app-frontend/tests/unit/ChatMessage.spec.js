import { shallowMount, createLocalVue } from '@vue/test-utils'
import ChatMessage from '@/components/ChatMessage.vue'
import Vuex from 'vuex'
import store from '@/store'

const factory = (chat, name) => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  store.commit('setName', name)

  return shallowMount(ChatMessage, {
    propsData: {
      chat,
    },
    store,
    localVue,
  })
}

describe('ChatMessage.vue', () => {
  it('renders chat messages', () => {
    const wrapper = factory({
      author: { id: 1, name: 'George' },
      content: 'George is happy',
      creation_time: '2020-03-07T10:44:10.842638-05:00',
    }, 'George')

    expect(wrapper.text()).toContain('George: George is happy')
  })
  it("styles active user's chats'", () => {
    const wrapper = factory({
      author: { id: 1, name: 'George' },
      content: 'George is happy',
      creation_time: '2020-03-07T10:44:10.842638-05:00',
    }, 'George')

    expect(wrapper.find('.active').text()).toContain('George: George is happy')
  })
  it("styles other user's chats'", () => {
    const wrapper = factory({
      author: { id: 1, name: 'George' },
      content: 'George is happy',
      creation_time: '2020-03-07T10:44:10.842638-05:00',
    }, 'Bob')

    expect(wrapper.find('.other').text()).toContain('George: George is happy')
  })
})
