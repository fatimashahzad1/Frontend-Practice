import { getToken } from "@/lib/get-token";
import { deleteClient, getClient, postClient } from "@/utils/client";
import { useToast } from "./use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch all people
const fetchAllPeople = async () => {
  const token = await getToken();
  if (!token) throw new Error("Token is Missing");

  const result = await getClient("people", token);
  if (result?.error)
    throw new Error(result?.message || "Failed to fetch people");

  return result;
};

// Follow person
const followPersonRequest = async (personId: number) => {
  const token = await getToken();
  if (!token) throw new Error("Token is Missing");

  const result = await postClient({
    url: `people/follow/${personId}`,
    token,
  });
  if (result?.error)
    throw new Error(result?.message || "Failed to follow person");

  return result;
};

// Unfollow person
const unfollowPersonRequest = async (personId: number) => {
  const token = await getToken();
  if (!token) throw new Error("Token is Missing");

  const result = await deleteClient({
    url: `people/unfollow/${personId}`,
    token,
  });
  if (result?.error)
    throw new Error(result?.message || "Failed to unfollow person");

  return result;
};

const usePeople = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch people with useQuery
  const {
    data: people,
    error,
    isLoading,
  } = useQuery<GetAllPeopleResponse>({
    queryKey: ["people"],
    queryFn: fetchAllPeople,
  });

  // Follow person mutation with useMutation
  const followPersonMutation = useMutation({
    mutationFn: followPersonRequest,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      toast({
        variant: "default",
        title: result.success,
        description: result.message,
      });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: err.message,
        description: "Failed to follow person",
      });
    },
  });

  // Unfollow person mutation with useMutation
  const unfollowPersonMutation = useMutation({
    mutationFn: unfollowPersonRequest,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      toast({
        variant: "default",
        title: result.success,
        description: result.message,
      });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: err.message,
        description: "Failed to unfollow person",
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
  };
};

export default usePeople;
