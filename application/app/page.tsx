// app/page.tsx
import { fetchUsers } from './lib/data';
import Home  from './components/Home';

export default async function Page() {
  // Server-side data fetching
  const users = await fetchUsers();
  
  // Pass the data to the client component
  return <Home initialUsers={users} />;
}