import { useState } from 'react'
import './App.css'
import { Button } from './shared/components/Button'
import { COLORS } from './shared/constants/colors'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-shell">
      <h1>Button test</h1>
      <p>Bu düymə `COLORS.mainGreen` ilə render olunur:</p>
      <Button
        type="primary"
        style={{
          backgroundColor: COLORS.mainGreen,
          borderColor: COLORS.mainGreen,
          color: '#fff',
          minWidth: 180,
        }}
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </Button>
    </div>
  )
}

export default App
