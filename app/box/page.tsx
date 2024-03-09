'use client';

import { Button } from '@/components/ui/button';
import { getUser } from '../actions/get-user';
import { getCookies } from '../actions/get-cookies';
import { patchUser } from '../actions/patch-user';
import { useEffect, useState } from 'react';

export default function BoxPage() {
  const [tickets, setTickets] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getInitialData() {
      setToken(await getCookies('token'));
      console.log(token);
      const user = await getUser(token);
      console.log(user);
      //!ERROR: ticket was not fetched intially
      setTickets(user!.tickets);
      setIsExpired(user!.isExpired);
      console.log('fetch initial data');
    }
    getInitialData();
  }, [token]);

  useEffect(() => {
    async function updateFields() {
      setTickets(tickets);
      setIsExpired(isExpired);
    }
    updateFields();
  }, [tickets, isExpired]);

  async function onClick() {
    try {
      if (tickets > 0) {
        setTickets(tickets - 1);
        console.log('tickets left: ', tickets);
      }
      if (tickets <= 0) {
        setIsExpired(true);
      }
    } catch (error) {
      throw new Error('Box click error');
    } finally {
      patchUser({ token, tickets, isExpired });
    }
  }
  return (
    <main className='text-wrap font-extrabold text-6xl text-white flex min-h-screen flex-col items-center justify-between p-24 bg-gray-700'>
      WELCOME TO BOX PAGE
      <Button onClick={() => onClick()}>Pick</Button>
    </main>
  );
}
