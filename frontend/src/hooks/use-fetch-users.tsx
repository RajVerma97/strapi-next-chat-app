import fetchStrapiUsers from "@/queries/fetch-strapi-users";
import { useQuery } from "@tanstack/react-query";

export default function useFetchStrapiUsers() {
  return useQuery({
    queryKey: ["fetch-users"],
    queryFn: () => fetchStrapiUsers(),
  });
}
