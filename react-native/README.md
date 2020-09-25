# ideas

### 📲 react-native-orientation 监听屏幕方向切换

### 🌼 UI Kitten Icons
- IconRegistry 注册到 service
- Icon 从 service 中获取

### 🌸 Eva 处理主题
- `<ApplicationProvider {...eva} theme={} />`

### 🌈 react-native-root-siblings 在根容器插入节点
- RootSiblingParent

### 🍕 unstated-next

share data using context and hooks

source code: [https://github.com/jamiebuilds/unstated-next/blob/master/src/unstated-next.tsx](https://github.com/jamiebuilds/unstated-next/blob/master/src/unstated-next.tsx)

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

export const Theme = createContainer(useTheme)
```

``` js
// App.js
import { Theme } = require('./logic')

const Child = () => {
  const {toggleTheme, theme} = Theme.useContainer()
  return <div 
    onClick={toggleTheme} 
    style={{
      background: theme === 'day' ? '#ffffff' : '#222222'
    }}
  >change theme</div>
}

const App = () => (
  <Theme.Provider initialState={'day'}>
    <Child />
    <Child />
  </Theme.Provider>
)
```
