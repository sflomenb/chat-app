import { shallowMount } from '@vue/test-utils'
import ChatLog from '@/components/ChatLog.vue'
import axios from 'axios'

jest.mock('axios')

/*
const factory = (values = []) => shallowMount(ChatLog, {
  data() {
    return {
      chats: values,
    }
  },
})
*/
const factory = () => shallowMount(ChatLog)

describe('ChatLog.vue', () => {
  it('renders chat messages', () => {
    const responseGet = {
      data: [
        {
          author: { id: 1, name: 'Sam' },
          content: 'Hello world',
          creation_time: '2020-03-07T10:44:10.842638-05:00',
        },
        {
          author: { id: 1, name: 'Sam' },
          content: 'Another message',
          creation_time: '2020-03-07T10:44:25.599916-05:00',
        },
      ],
    }
    axios.get.mockResolvedValue(responseGet)
    const wrapper = factory()

    expect(axios.get).toHaveBeenCalledTimes(1)

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.text()).toContain('Sam: Hello world')
      expect(wrapper.text()).toContain('Sam: Another message')
    })
  })
})
