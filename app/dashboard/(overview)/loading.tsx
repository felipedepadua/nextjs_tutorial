import DashboardSkeleton from '@/app/ui/skeletons';
 
export default function Loading() {
  return <DashboardSkeleton />;
}

// See https://nextjs.org/learn/dashboard-app/streaming#fixing-the-loading-skeleton-bug-with-route-groups
// on why we put those files inside a (overview) folder.
// ANSWER: Now, the loading.tsx file will only apply to your dashboard overview page. 
// (wont be applied to /invoices/page.tsx and /customers/page.tsx)


// [VI] SEE DOC FOR 'Route Groups':
// https://nextjs.org/docs/app/building-your-application/routing/route-groups
// When you create a new folder using parentheses (), the name won't be included in the URL path. So /dashboard/(overview)/page.tsx becomes /dashboard.
// Here, you're using a route group to ensure loading.tsx only applies to your dashboard overview page. 
// However, you can also use route groups to separate your application into sections (e.g. (marketing) routes and (shop) routes) or by teams for larger applications.

// NEXT:  So far, you're streaming a whole page. But, instead, you can be more granular and stream specific components using React Suspense.