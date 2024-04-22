import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const promise = axios.post('/contacts', { ...contact });
      toast.promise(promise, {
        loading: 'Creating new contact...',
        success: 'New contact has been added.',
        error: 'Cannot create new contact. Please, try again later',
      });
      const response = await promise;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const promise = axios.delete(`/contacts/${id}`);
      toast.promise(promise, {
        loading: 'Deleting contact...',
        success: 'Contact has been deleted.',
        error: 'Cannot delete contact. Please, try again later',
      });
      const response = await promise;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, ...rest }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, { ...rest });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
