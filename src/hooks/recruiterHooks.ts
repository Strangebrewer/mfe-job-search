import { useMutation, useQuery } from '@tanstack/react-query';
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
  return useMutation({
      mutationKey: ['create-new-recruiter'],
      mutationFn: async (payload: Record<string, any>) => {
        const response = await recruiterApi.create(payload);
        console.log('response from useCreateRecruiter:::', response);
        return response.data;
      }
  });
};