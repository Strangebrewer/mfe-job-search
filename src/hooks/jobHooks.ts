import { useMutation, useQuery } from '@tanstack/react-query';
import jobApi from '../api/jobApi';

export const useGetJobs = () => {
  return useQuery({
    queryKey: ['get-jobs'],
    queryFn: async () => {
      const response = await jobApi.get();
      console.log('response from useGetJobs:::', response);
      return response?.data;
    }
  });
};

export const useCreateJob = () => {
  return useMutation({
    mutationKey: ['create-new-job'],
    mutationFn: async (payload: Record<string, any>) => {
      const response = await jobApi.create(payload);
      console.log('response from useCreateJob:::', response);
      return response.data;
    }
  });
}