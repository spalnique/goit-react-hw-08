import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { axiosParams } from '../constants';

const axiosContacts = axios.create(axiosParams);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosContacts.get('/contacts');
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
      const promise = axiosContacts.post('/contacts', { ...contact });
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
      const promise = axiosContacts.delete(`/contacts/${id}`);
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
      const response = await axiosContacts.patch(`/contacts/${id}`, {
        ...rest,
      });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
