import { useMutation } from "@apollo/client";
import { useAuthenticated } from "@nhost/react";

export function useAuthMutation(query, options) {
  const isAuthenticated = useAuthenticated();
  const newOptions = { ...options, skip: options?.skip || !isAuthenticated };
  return useMutation(query, newOptions);
}
