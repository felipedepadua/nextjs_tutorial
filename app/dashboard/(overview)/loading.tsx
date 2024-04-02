import DashboardSkeleton from '@/app/ui/skeletons';
 
// loading.tsx is a special Next.js file built on top of Suspense, it allows you to create fallback UI to 
// show as a replacement while page content loads.
export default async function Loading() {
  // Not really being used now as we are doing more granular streaming with Suspense inside the page.tsx.
  //return <DashboardSkeleton />;
}

// NEXT:  So far, you're streaming a whole page. But, instead, you can be more granular and stream specific components using React Suspense.
// See here: https://nextjs.org/learn/dashboard-app/streaming
//     There are two ways you implement streaming in Next.js:
//        1) At the page level, with the loading.tsx file.
//        2) For specific components, with <Suspense>.

// See https://nextjs.org/learn/dashboard-app/streaming#fixing-the-loading-skeleton-bug-with-route-groups
// on why we put those files inside a (overview) folder.
// ANSWER: Now, the loading.tsx file will only apply to your dashboard overview page. 
// (wont be applied to /invoices/page.tsx and /customers/page.tsx)
// If you leave in the main ('aka dashboard') folder, it will apply to all pages in any folder inside dashboard folder.
// That's why we make the change above.


// [VI] SEE DOC FOR 'Route Groups':
// https://nextjs.org/docs/app/building-your-application/routing/route-groups
// When you create a new folder using parentheses (), the name won't be included in the URL path. So /dashboard/(overview)/page.tsx becomes /dashboard.
// Here, you're using a route group to ensure loading.tsx only applies to your dashboard overview page. 
// However, you can also use route groups to separate your application into sections (e.g. (marketing) routes and (shop) routes) or by teams for larger applications.
