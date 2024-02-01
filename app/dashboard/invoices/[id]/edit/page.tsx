import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

// In addition to searchParams, page components also accept a prop called params which you can use to access the id
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  // While error.tsx is useful for catching all errors, notFound can be used when you try to fetch a resource that doesn't exist.
  // E.g.  http://localhost:3000/dashboard/invoices/80ea8f2d-a9cc-4a2d-9791-998440793f8b/edit 
  // (PS: It has to be a VALID uuid that doesnt exist, if invalid, it will show error page instead)
  //       - In the "throw new Error('Failed to fetch invoice.');" inside fetchInvoiceById function.
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
