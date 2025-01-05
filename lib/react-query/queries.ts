import { useQuery } from "@tanstack/react-query";
import {
  getLatestProperties,
  getProperties,
  getPropertyById,
} from "../appwrite";

export const useProperties = ({
  limit,
  query,
  filter,
}: {
  limit?: number;
  query: string;
  filter: string;
}) => {
  return useQuery({
    queryKey: ["properties", { query, filter, limit }], // Unique query key
    queryFn: async () => {
      try {
        return await getProperties({ limit, query, filter });
      } catch (error) {
        console.error("Error fetching properties:", error);
        throw error; // Throw to let React Query handle it as an error
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes before data is considered stale
    retry: 2, // Retry the query up to 2 times if it fails
  });
};

export const useLatestProperties = () => {
  return useQuery({
    queryKey: ["latestProperties"], // Unique query key
    queryFn: async () => {
      try {
        return await getLatestProperties();
      } catch (error) {
        console.error("Error fetching latest properties:", error);
        throw error; // Throw to let React Query handle it as an error
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes before data is considered stale
    retry: 2, // Retry the query up to 2 times if it fails
  });
};

export const useSpecificProperty = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["specificProperty", { id }], // Unique query key
    queryFn: async () => {
      try {
        return await getPropertyById({ id });
      } catch (error) {
        console.error("Error fetching specificProperty :", error);
        throw error; // Throw to let React Query handle it as an error
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes before data is considered stale
    retry: 2, // Retry the query up to 2 times if it fails
  });
};
