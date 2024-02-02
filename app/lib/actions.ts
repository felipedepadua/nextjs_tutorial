'use server';
// By adding the 'use server', you mark all the exported functions within the file as server functions.
// These server functions can then be imported into Client and Server components, making them extremely versatile.
// You can also write Server Actions directly inside Server Components by adding "use server" inside the action,
// but for this course, we'll keep them all organized in a separate file.

// To handle type validation, you have a few options. While you can manually validate types, using a type validation library can
// save you time and effort.
// For your example, we'll use Zod, a TypeScript-first validation library that can simplify this task for you.
import { z } from 'zod';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth'; // import the signIn function from auth.ts
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    // Zod already throws an error if the customer field is empty as it expects a type string. But let's add a friendly message if the user doesn't select a customer.
    invalid_type_error: 'Please select a customer.',
  }),
  // Since you are coercing the amount type from string to number, it'll default to zero if the string is empty. Let's tell that we want a value greater than zero.
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    // Zod already throws an error if the status field is empty as it expects "pending" or "paid". But let's add a friendly message if the user doesn't select a status.
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// prevState - contains the state passed from the useFormState hook. You won't be using it in the action in this example, but it's a required prop.
export async function createInvoice(prevState: State, formData: FormData) {
  // OLDER, MORE BASIC WAY TO DO THIS:
  // const rawFormData = {
  //     customerId: formData.get('customerId'),
  //     amount: formData.get('amount'),
  //     status: formData.get('status'),
  //   };
  // Tip: If you're working with forms that have many fields, you may want to consider using the entries() method with
  // JavaScript's Object.fromEntries(). For example: const rawFormData = Object.fromEntries(formData.entries())
  //   // Test it out:
  //   console.log("typeof rawFormData.amount: ", typeof rawFormData.amount);
  //   console.log(rawFormData);

  // Newer way with Zod:
  // safeParse() will return an object containing either a success or error field. 
  //This will help handle validation more gracefully without having put this logic inside the try/catch block.
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  console.log("validatedFields: ", validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  // It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.
  const amountInCents = amount * 100;
  // Finally, let's create a new date with the format "YYYY-MM-DD" for the invoice's creation date
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  console.log("validatedFields: ", validatedFields);

  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  // This would only be reachable if try is successful.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    // Since this action is being called in the /dashboard/invoices path, you don't need to call redirect. 
    // Calling revalidatePath will trigger a new server request and re-render the table.
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }  
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}