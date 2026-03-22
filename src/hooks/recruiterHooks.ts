import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import recruiterApi from '../api/recruiterApi';

export const useGetRecruiters = () => {
  return useQuery({
    queryKey: ['get-recruiters'],
    queryFn: async () => {
      const response = await recruiterApi.get();
      console.log('response from useGetRecruiters:::', response);
      return response?.data;
    },
  });
};

export const useCreateRecruiter = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationKey: ['create-new-recruiter'],
      mutationFn: async (payload: Record<string, any>) => {
        const response = await recruiterApi.create(payload);
        console.log('response from useCreateRecruiter:::', response);
        return response.data;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-recruiters'] }),
  });
};

export const useUpdateRecruiter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-recruiter'],
    mutationFn: async (payload: Record<string, any>) => {
      const response = await recruiterApi.update(payload);
      console.log('response from useUpdateRecruiter:::', response);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-recruiters'] }),
  });
};

export const useDeleteRecruiter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-recruiter'],
    mutationFn: async (id: string) => {
      const response = await recruiterApi.delete(id);
      console.log('response from useDeleteRecruiter:::', response);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-recruiters'] }),
  });
};