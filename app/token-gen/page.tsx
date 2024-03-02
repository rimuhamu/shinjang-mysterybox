'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { generateToken } from '@/app/actions/generate-token';
import {
  GeneratorValidator,
  TGeneratorValidator,
} from '@/lib/validators/generator-validator';
import { useState } from 'react';

export default function TokenGenPage() {
  const [token, setToken] = useState('');
  const form = useForm<TGeneratorValidator>({
    resolver: zodResolver(GeneratorValidator),
    defaultValues: {
      name: '',
      tickets: 1,
    },
  });

  function onCopy() {
    navigator.clipboard.writeText(token);
    toast.success('Access token copied to the clipboard.');
  }

  async function onSubmit(values: TGeneratorValidator) {
    try {
      const user = await generateToken(values);

      setToken(user.token!);

      toast.success('Token has been generated.');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gray-700 p-24'>
      <div className='flex flex-col w-full max-w-sm items-center space-x-2 gap-10'>
        <h1 className='text-white font-bold text-lg'>
          Generate a Token for the user
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter participant name'
                      type='text'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tickets'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...form.register('tickets', { valueAsNumber: true })}
                      placeholder='How many tickets'
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='w-full'
              type='submit'>
              Generate
            </Button>
          </form>
        </Form>
        <Button onClick={() => onCopy()}>Copy Token</Button>
      </div>
    </main>
  );
}
