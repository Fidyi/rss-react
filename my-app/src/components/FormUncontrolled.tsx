import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addFormData } from '../slices/formDataSlice'
import { useNavigate } from 'react-router-dom'

const FormUncontrolled: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const termsRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
    }

    dispatch(addFormData(formData))
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" ref={ageRef} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>
          <input type="checkbox" ref={termsRef} /> Accept Terms and Conditions
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default FormUncontrolled
