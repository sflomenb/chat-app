import { shallowMount } from '@vue/test-utils'
import ChatMessage from '@/components/ChatMessage.vue'

const factory = (value = {}) => shallowMount(ChatMessage, {
  propsData: {
    chat: value,
  },
})

describe('ChatMessage.vue', () => {
  it('renders chat messages', () => {
    const wrapper = factory(
      {
        author: { id: 1, name: 'George' },
        content: 'George is happy',
        creation_time: '2020-03-07T10:44:10.842638-05:00',
      },
    )
    expect(wrapper.text()).toContain('George: George is happy')
  })
})
