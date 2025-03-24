import { getToken } from '@/lib/get-token';
import { deleteClient, getClient, postClient } from '@/utils/client';
import { useToast } from './use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

// Fetch all people
const fetchAllPeople = async () => {
  const token = await getToken();
  if (!token) throw new Error('Token is Missing');

  const result = await getClient('people', token);
  return result;
};

// Fetch people with search
const fetchPeopleWithSearch = async (searchString: string) => {
  const token = await getToken();
  if (!token) throw new Error('Token is Missing');

  const result = await getClient(
    `people/search?searchString=${searchString}`,
    token
  );
  if (result?.error)
    throw new Error(result?.message || 'Failed to fetch people');
  return result?.people || [];
};

// Follow person
const followPersonRequest = async (personId: number) => {
  const token = await getToken();
  if (!token) throw new Error('Token is Missing');

  const result = await postClient({
    url: `people/follow/${personId}`,
    token,
  });
  if (result?.error)
    throw new Error(result?.message || 'Failed to follow person');

  return result;
};

// Unfollow person
const unfollowPersonRequest = async (personId: number) => {
  const token = await getToken();
  if (!token) throw new Error('Token is Missing');

  const result = await deleteClient({
    url: `people/unfollow/${personId}`,
    token,
  });
  if (result?.error)
    throw new Error(result?.message || 'Failed to unfollow person');

  return result;
};

const usePeople = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [people, setPeople] = useState<GetAllPeopleResponse>();
  const [searchString, setSearchString] = useState<string>('');

  // Fetch people with useQuery
  const { data, error, isLoading } = useQuery<GetAllPeopleResponse>({
    queryKey: [ROUTE_QUERY_KEYS.GET_ALL_PEOPLE],
    queryFn: fetchAllPeople,
    staleTime: 24 * 60 * 60 * 1000,
    throwOnError: true,
  });

  const {
    data: searchedPeople,
    error: searchedError,
    isLoading: searchedPeopleIsLoading,
  } = useQuery({
    queryKey: [ROUTE_QUERY_KEYS.GET_ALL_PEOPLE, searchString], // Add searchQuery to trigger refetch
    queryFn: () => fetchPeopleWithSearch(searchString),
    enabled: searchString.length >= 1, // Avoid unnecessary calls on empty search
  });

  //when searched results are fetched
  useEffect(() => {
    if (searchedPeople) {
      setPeople({ people: searchedPeople });
    }
  }, [searchedPeople]);

  //when initially all people are feched
  useEffect(() => {
    if (data) {
      setPeople(data);
    }
  }, [data]);

  //when searched string is empty
  useEffect(() => {
    if (!searchString && data) {
      setPeople(data);
    }
  }, [searchString, data]);

  // Follow person mutation with useMutation
  const followPersonMutation = useMutation({
    mutationFn: followPersonRequest,
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ROUTE_QUERY_KEYS.GET_ALL_UNFOLLOWED_USERS,
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: ROUTE_QUERY_KEYS.GET_ALL_PEOPLE,
        refetchType: 'active',
      });
      toast({
        variant: 'default',
        title: result.success,
        description: result.message,
      });
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'Failed to follow person',
      });
    },
  });

  // Unfollow person mutation with useMutation
  const unfollowPersonMutation = useMutation({
    mutationFn: unfollowPersonRequest,
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: [ROUTE_QUERY_KEYS.GET_ALL_PEOPLE],
      });
      toast({
        variant: 'default',
        title: result.success,
        description: result.message,
      });
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'Failed to unfollow person',
      });
    },
  });

  return {
    loading: isLoading,
    error,
    people: people?.people || [],
    followPerson: followPersonMutation.mutate,
    followPersonLoading: followPersonMutation.isPending,
    unfollowPerson: unfollowPersonMutation.mutate,
    unfollowPersonLoading: unfollowPersonMutation.isPending,
    searchString,
    setSearchString,
    searchedPeopleIsLoading,
    searchedError,
  };
};

export default usePeople;
