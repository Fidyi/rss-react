import React from 'react'
import { Link } from 'react-router-dom'
import ReadOnlyForm from './components/ReadOnlyForm'

const App: React.FC = () => {
  return (
    <div className="p-4">
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
      <ReadOnlyForm />
    </div>
  )
}

export default App
