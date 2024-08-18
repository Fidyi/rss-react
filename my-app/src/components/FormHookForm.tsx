import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { addFormData } from '../slices/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../slices/countriesSlice';
import { AppDispatch, RootState } from '../store';

export interface FormValues<T> {
  confirmPassword: string;
  terms: boolean;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  picture: T;
  country: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required').matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup.number().required().positive().integer(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/[0-9]/, 'Must contain a number')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[\W_]/, 'Must contain a special character'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
  gender: yup.string().required(),
  terms: yup.bool().oneOf([true], 'Terms must be accepted').required(),
  picture: yup.mixed<FileList>().nullable().required('Picture is required'),
  country: yup.string().required('Please select a country'),
}).defined();

const FormHookForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(selectCountries);

  const formData = useSelector((state: RootState) => state.formData.data[0]) || {};

  const initialFormData = {
    ...formData,
    picture: typeof formData.picture === 'string' ? null : formData.picture,
  };

  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<FormValues<FileList | null>>({
    resolver: yupResolver(schema) as any,
    mode: 'onChange',
    defaultValues: initialFormData,
  });

  const pictureValue = watch('picture');

  const onSubmit: SubmitHandler<FormValues<FileList | null>> = async (data) => {
    const file = pictureValue && pictureValue[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        const finalData = { ...data, picture: base64String };
        dispatch(addFormData(finalData));
        navigate('/');
      };
      
      reader.readAsDataURL(file);
    } else {
      const finalData = { ...data, picture: null };
      dispatch(addFormData(finalData));
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register('age')} />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <span className="error">{errors.gender.message}</span>
        )}
      </div>
      <div className="checkbox">
        <label>
          <input type="checkbox" {...register('terms')} />
          <p>Accept Terms and Conditions</p>
        </label>
        {errors.terms && <span className="error">{errors.terms.message}</span>}
      </div>
      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" {...register('picture')} />
        {errors.picture && (
          <span className="error">{errors.picture.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country" {...register('country')}>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className="error">{errors.country.message}</span>
        )}
      </div>
      <button type="submit" disabled={!isValid} className={!isValid ? 'button-disabled' : ''}>
        Submit
      </button>
    </form>
  );
};

export default FormHookForm;
