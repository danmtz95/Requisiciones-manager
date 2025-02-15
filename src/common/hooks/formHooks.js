import { useState } from 'react';

export const useForm = initialState => {
  const [form, setForm] = useState(initialState);
  const handleChange = (event, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  return [form, handleChange, setForm];
};
