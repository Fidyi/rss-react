import React from 'react'
import { Link } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Main Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/form-uncontrolled">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/form-hook-form">React Hook Form</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default App
