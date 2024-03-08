'use client';
import 'dotenv/config';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  TTokenValidator,
  TokenValidator,
} from '@/lib/validators/token-validator';
import { useRouter } from 'next/navigation';
import { setCookies } from '../actions/set-cookies';
import { getTokens } from '../actions/get-tokens';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const [isValidToken, setIsValidToken] = useState(false);

  const form = useForm<TTokenValidator>({
    resolver: zodResolver(TokenValidator),
    defaultValues: {
      token: '',
    },
  });

  async function onSubmit(values: TTokenValidator) {
    try {
      const token = values.token;
      const availableTokens = getTokens();

      const validTokens = (await availableTokens).filter((availableToken) => {
        return availableToken.isExpired === false;
      });

      setCookies(token);
      // console.log(availableTokens);
      // console.log(validTokens);
      // console.log(token);

      validTokens.forEach((validToken) => {
        if (token === validToken.token) {
          setIsValidToken(true);
          return;
        } else {
          setIsValidToken(false);
        }
      });

      if (token === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
        console.log('admin match!');
        router.push('/token-gen');
      } else if (isValidToken) {
        console.log('user match!');
        router.push('/box');
      } else {
        toast.error('Please enter a valid token.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gray-700 p-24'>
      <div className='flex flex-col w-full max-w-sm items-center space-x-2 gap-10'>
        <h1 className='text-white font-bold text-lg text-center'>
          Welcome to shinjang mysterybox!
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'>
            <FormField
              control={form.control}
              name='token'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter your token'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='w-full'
              type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
