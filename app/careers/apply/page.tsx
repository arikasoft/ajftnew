import CareerApplyClient from "./CareerApplyClient";

type PageProps = {
  searchParams: Promise<{
    jobId?: string;
  }>;
};

export default async function CareerApplyPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  return (
    <CareerApplyClient
      jobId={params.jobId || ""}
    />
  );
}