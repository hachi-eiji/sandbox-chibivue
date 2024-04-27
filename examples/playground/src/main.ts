import {createApp, h} from 'chibivue'

const app = createApp({
  render() {
    return h('div', {}, [
      h('p', {} ,['Hello world']),
      h('button', {} ,['click'])
    ]
    );
  }
})
app.mount('#app')
