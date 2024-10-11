'use client';

import { UserValidation } from '@/lib/validations/userschema';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { onboardUser } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

function OnboardForm({ user }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    await onboardUser({name: data.name, username: data.username, bio: data.bio, id: user.id})
    router.push("/")
  };

  return (
    <div className="p-6 shadow-lg rounded-lg max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold text-lg">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold text-lg">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Choose a unique username"
                    className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio Field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold text-lg">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Tell us a little about yourself"
                    className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default OnboardForm;
