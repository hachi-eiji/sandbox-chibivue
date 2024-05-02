import {createApp, h, reactive} from 'chibivue'

const CounterComponent = {
  setup() {
    const state = reactive({count: 0});
    const increment = () => state.count++;

    return () =>
      h('div', {}, [
        h('p', {}, [`count: ${state.count}`]),
        h('button', {onClick: increment}, ['increment'])
      ]);
  }
}

const MyComponent = {
  props: {someMessage: {type: String}},

  setup(props: {someMessage: string}){
    return () =>
      h('div', {id: 'my-app'}, [`message: ${props.someMessage}`])
  }
}

const app = createApp({
  setup() {

    const state = reactive({message: 'hello'})
    const changeMessage = () => {
      state.message += '!'
    }

    return () =>
      h('div', {id: 'my-app'}, [
        h(CounterComponent, {}, []),
        h(CounterComponent, {}, []),
        h(CounterComponent, {}, []),
        h(MyComponent, { 'some-message': state.message }, []),
        h('button', {onClick: changeMessage}, ['change message'])
      ]);
  }
})
app.mount('#app')
