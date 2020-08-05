import { shallowMount, createLocalVue } from '@vue/test-utils'
import ChatNamePopup from '@/components/ChatNamePopup.vue'
import axios from 'axios'
import Vuex from 'vuex'
import store from '@/store'

jest.mock('axios')

beforeEach(() => jest.resetAllMocks())

describe('ChatNamePopup.vue', () => {
  it('has no name by default', () => {
    const defaultData = ChatNamePopup.data()
    expect(defaultData.name).toBe('')
  })
  it('can test that the name supplied is a valid name', () => {
    const wrapper = shallowMount(ChatNamePopup)

    expect(wrapper.vm.validName).toBeFalsy()

    wrapper.setData({ name: 'Sam' })

    expect(wrapper.vm.validName).toBeTruthy()
  })
  it('sets error message if name already exists', async () => {
    const wrapper = shallowMount(ChatNamePopup)

    wrapper.setData({
      name: 'Sam',
      errorMessage: '',
    })

    axios.post.mockRejectedValue({
      response: {
        data: {
          name: ['user with this name already exists.'],
        },
      },
    })

    await wrapper.vm.submitName()

    expect(axios.post).toHaveBeenCalledTimes(1)
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.error').text()).toEqual('Sam is already taken, please choose a different name')
    })
  })
  it('sets name in state if it is not taken', async () => {
    // needed for Vuex
    const localVue = createLocalVue()
    localVue.use(Vuex)

    /*
    const store = new Vuex.Store({
      state: {
        name: '',
      },
      // getters: {
      //   name: (state) => state.name,
      // },
    })
    */

    const wrapper = shallowMount(ChatNamePopup, {
      store,
      localVue,
    })

    // const state = { name: '' }

    wrapper.setData({
      name: 'Sam',
      errorMessage: '',
    })

    axios.post.mockResolvedValue({
      response: {
        data: {
          name: ['user with this name already exists.'],
        },
      },
    })

    await wrapper.vm.submitName()

    expect(axios.post).toHaveBeenCalledTimes(1)
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.error').text()).toEqual('')
      expect(store.state.name).toEqual('Sam')
    })
  })
})
