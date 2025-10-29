import { useDashboard } from './hooks/useDashboards.ts';
import { Header } from '@/modules/dashboard/components/Header.tsx';

export const Dashboard = () => {
  const { data, isLoading, error } = useDashboard();

  console.log(data, isLoading, error);

  return (
    <div>
      <Header title="Dashboard" />
    </div>
  );
};