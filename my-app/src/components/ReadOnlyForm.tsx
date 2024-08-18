import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ReadOnlyForm: React.FC = () => {
  const formData = useSelector((state: RootState) => state.formData.data[0]) || {};
  const [formValues, setFormValues] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    picture: '',
    country: ''
  });
  
  useEffect(() => {
    if (formData) {
      setFormValues({
        name: formData.name || '',
        age: formData.age?.toString() || '',
        email: formData.email || '',
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || '',
        gender: formData.gender || '',
        terms: formData.terms || false,
        picture: formData.picture || '',
        country: formData.country || ''
      });
    }
  }, [formData]);

  return (
    <form className="p-4">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={formValues.name} disabled />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" value={formValues.age} disabled />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={formValues.email} disabled />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={formValues.password} disabled />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" value={formValues.confirmPassword} disabled />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <input id="gender" type="text" value={formValues.gender} disabled />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={formValues.terms} disabled /> Accept Terms and Conditions
        </label>
      </div>
      <div>
        <label htmlFor="picture">Picture</label>
        <input id="picture" type="text" value={formValues.picture ? 'Picture Uploaded' : 'No Picture'} disabled />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input id="country" type="text" value={formValues.country} disabled />
      </div>
    </form>
  );
};

export default ReadOnlyForm;
