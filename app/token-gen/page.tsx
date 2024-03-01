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
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { generateToken } from '@/app/actions/generate-token';

export default function TokenGenPage() {
  const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //   await axios.post(`http://localhost:3000/api/generate`, values.name);
      generateToken(values.name);
      toast.success('Token has been generated.');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };
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
                      placeholder='Name'
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
              Generate
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
