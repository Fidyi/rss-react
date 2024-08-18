import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFormData } from '../slices/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../slices/countriesSlice';
import { RootState } from '../store';

const FormUncontrolled: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(selectCountries);

  const formData = useSelector((state: RootState) => state.formData.data[0]) || {};

  useEffect(() => {
    if (formData) {
      if (nameRef.current) nameRef.current.value = formData.name || '';
      if (ageRef.current) ageRef.current.value = formData.age?.toString() || '';
      if (emailRef.current) emailRef.current.value = formData.email || '';
      if (passwordRef.current) passwordRef.current.value = formData.password || '';
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = formData.confirmPassword || '';
      if (genderRef.current) genderRef.current.value = formData.gender || '';
      if (termsRef.current) termsRef.current.checked = formData.terms || false;
      if (countryRef.current) countryRef.current.value = formData.country || '';
    }
  }, [formData]);

  const validateFields = () => {
    let newErrors: { [key: string]: string } = {};

    const name = nameRef.current?.value || '';
    if (!/^[A-Z]/.test(name)) {
      newErrors.name = 'Name must start with an uppercase letter';
    }

    const age = parseInt(ageRef.current?.value || '0');
    if (isNaN(age) || age <= 0) {
      newErrors.age = 'Age must be a positive number';
    }

    const email = emailRef.current?.value || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!termsRef.current?.checked) {
      newErrors.terms = 'You must accept the Terms and Conditions';
    }

    const file = pictureRef.current?.files?.[0];
    if (!file) {
      newErrors.picture = 'Picture is required';
    } else if (file.size > 5000000 || !['image/jpeg', 'image/png'].includes(file.type)) {
      newErrors.picture = 'Invalid file type or file is too large';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const file = pictureRef.current?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const formData = {
            name: nameRef.current?.value || '',
            age: parseInt(ageRef.current?.value || '0'),
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            confirmPassword: confirmPasswordRef.current?.value || '',
            gender: genderRef.current?.value || '',
            terms: termsRef.current?.checked || false,
            picture: base64String,
            country: countryRef.current?.value || '',
          };

          dispatch(addFormData(formData));
          navigate('/');
        };
        reader.readAsDataURL(file);
      } else {
        const formData = {
          name: nameRef.current?.value || '',
          age: parseInt(ageRef.current?.value || '0'),
          email: emailRef.current?.value || '',
          password: passwordRef.current?.value || '',
          confirmPassword: confirmPasswordRef.current?.value || '',
          gender: genderRef.current?.value || '',
          terms: termsRef.current?.checked || false,
          picture: '',
          country: countryRef.current?.value || '',
        };

        dispatch(addFormData(formData));
        navigate('/');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate> {/* Добавляем noValidate для отключения стандартной валидации */}
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" ref={ageRef} />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}
      </div>
      <div>
        <label>
          <input type="checkbox" ref={termsRef} /> Accept Terms and Conditions
        </label>
        {errors.terms && <span className="error">{errors.terms}</span>}
      </div>
      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" ref={pictureRef} />
        {errors.picture && <span className="error">{errors.picture}</span>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country" ref={countryRef}>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <span className="error">{errors.country}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormUncontrolled;
