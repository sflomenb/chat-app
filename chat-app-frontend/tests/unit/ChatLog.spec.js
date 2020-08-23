import { mount, createLocalVue } from '@vue/test-utils'
import ChatLog from '@/components/ChatLog.vue'
import axios from 'axios'
import Vuex from 'vuex'
import store from '@/store'

jest.mock('axios')

const factory = (values = {}) => mount(ChatLog, values)

describe('ChatLog.vue', () => {
  it('renders chat messages', () => {
    // set up vuex
    const localVue = createLocalVue()
    localVue.use(Vuex)

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

    const wrapper = factory({
      store,
      localVue,
    })

    expect(axios.get).toHaveBeenCalledTimes(1)

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.text()).toContain('Sam: Hello world')
      expect(wrapper.text()).toContain('Sam: Another message')
    })
  })
})
