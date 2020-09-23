# ideas

### 🍕unstated-next

share data using context and hooks

``` js
// logic.js
import { useState } from 'react'
import { createContainer } from 'unstated-next'

function useTheme(initialTheme = 'day') {
  const [theme, setTheme] = useState(initialTheme)
  return { 
    theme, 
    toggleTheme: () => setTheme(prev => prev === 'day' ? 'day' : 'night)
  }
}

export const state = createContainer(useTheme)
```

``` js
// App.js
import { state } = require('./logic')

const Child = () => {
  const {toggleTheme, theme} = state.useContainer()
  return <div 
    onClick={toggleTheme} 
    style={{
      background: theme === 'day' ? '#ffffff' : '#222222'
    }}
  >change theme</div>
}

const App = () => (
  <state.Provider initialState={'day'}>
    <Child />
    <Child />
  </state.Provider>
)
```
