import axios from 'axios';

export const addAccount = accountDetails =>
  new Promise((resolve => setTimeout(() => resolve('test'), 300)))

export const fetchConnectedAccounts = () =>
  new Promise((resolve => setTimeout(() => resolve('test'), 300)))