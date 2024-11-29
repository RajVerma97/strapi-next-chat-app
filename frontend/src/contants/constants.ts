export const NEXT_PUBLIC_BACKEND = process.env.NEXT_PUBLIC_BACKEND as string;
export const NEXT_PUBLIC_STRAPI_API_TOKEN = process.env
  .NEXT_PUBLIC_STRAPI_API_TOKEN as string;

if (!NEXT_PUBLIC_BACKEND) {
  throw new Error("NEXT_PUBLIC_BACKEND environment variable is not defined");
}

if (!NEXT_PUBLIC_STRAPI_API_TOKEN) {
  throw new Error(
    "NEXT_PUBLIC_STRAPI_API_TOKEN environment variable is not defined"
  );
}
