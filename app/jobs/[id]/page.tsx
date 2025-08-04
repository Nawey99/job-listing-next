import JobDetail from '@/components/JobDetail';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

export default async function JobPage({ params }: Params) {
  try {
    const response = await fetch(`https://akil-backend.onrender.com/opportunities/${params.id}`, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      return notFound();
    }

    const { data: job } = await response.json();

    if (!job) {
      return notFound();
    }

    return (
      <div className="max-w-4xl mx-auto my-10">
        <JobDetail job={job} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching job:', error);
    return notFound();
  }
}