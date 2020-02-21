import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/home'
import {clientId} from './config'
import BaaS from 'baas'

BaaS.init(clientId, {
  autoLogin: true,
})

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  ReactDOM.render(<Home />, container)
}

"undefined" != typeof wx && wx.getSystemInfoSync || createApp()
