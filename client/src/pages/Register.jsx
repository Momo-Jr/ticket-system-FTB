import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../features/auth/authSlice';
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { name, email, password, confirmPassword } = formData;

  const onChange = (event, id) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    }
  };
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create Your Account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              value={name}
              placeholder='Full Name'
              onChange={(event) => onChange(event, 'name')}
              id='name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='email'
              value={email}
              placeholder='Enter your email'
              onChange={(event) => onChange(event, 'email')}
              id='email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              value={password}
              placeholder='Enter your password'
              onChange={(event) => onChange(event, 'password')}
              id='password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={(event) => onChange(event, 'confirmPassword')}
              id='confirmPassword'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
