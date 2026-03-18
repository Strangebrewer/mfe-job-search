import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-new-job'],
    mutationFn: async (payload: Obj) => {
      const response = await jobApi.create(payload);
      console.log('response from useCreateJob:::', response);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-jobs'] }),
  });
}

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-job'],
    mutationFn: async (payload: Obj) => {
      const response = await jobApi.update(payload);
      console.log('response from useupdateJob:::', response);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-jobs'] }),
  });
}

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-job'],
    mutationFn: async (id: string) => {
      const response = await jobApi.delete(id);
      console.log('response from useDeleteJob:::', response);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-jobs'] }),
  });
}