import { MinimalTiptapEditor } from './components/minimal-tiptap'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from './lib/utils'

export default function App() {
  return (
    <main className="flex min-h-screen place-items-center justify-center bg-white p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">Minimal Tiptap Editor</h1>
          <div className="mt-10 flex w-full text-left">
            <ExampleForm />
          </div>
        </div>
      </div>
    </main>
  )
}

const ExampleForm = () => {
  const formSchema = z.object({
    description: z
      .string({
        required_error: 'Description is required'
      })
      .min(1, 'Description is required')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  {...field}
                  onValueChange={field.onChange}
                  outputValue="json"
                  className={cn('w-full', {
                    'border-red-500 focus-within:border-red-500': form.formState.errors.description
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
