import {
  NEXT_PUBLIC_BACKEND,
  NEXT_PUBLIC_STRAPI_API_TOKEN,
} from "@/contants/constants";
import axios from "axios";

export default async function fetchStrapiUsers() {
  const response = await axios.get(`${NEXT_PUBLIC_BACKEND}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  });
  return response.data;
}
