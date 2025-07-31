import jobData from '@/data/jobs.json';
import JobDetail from '@/components/JobDetail';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

export default function JobPage({ params }: Params) {
  const id = parseInt(params.id, 10);
  const job = jobData.job_postings[id];

  if (!job) return notFound();

  return (
    <div className="max-w-4xl mx-auto my-10">
      <JobDetail job={job} />
    </div>
  );
}
