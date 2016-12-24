import React from 'react'
import { Route } from 'react-router'
import App from './App'

export default (<Route path="/" component={App}>
  <Route path="/:animateEnter" component={App} />
  <Route path="/:animateEnter/:animateLeave" component={App} />
  </Route>)


// export default (<Route path="/" component={App}>
//   <IndexRoute component={Main} />
//   <Route path="/:test" component={Main} />
//   </Route>)
