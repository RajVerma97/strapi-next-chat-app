import createOrJoinRoom from "@/queries/create-or-join-room";
import useAuthenticatedMutation from "./use-authenticated-mutation";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/error-response";
import { createOrJoinRoomData } from "@/types/create-or-join-room";

export default function useJoinOrCreateRoomMutation(options: {
  onSuccess: (data) => void;
  onError: (error: AxiosError<ErrorResponse>) => void;
}) {
  return useAuthenticatedMutation({
    mutationFn: (params: createOrJoinRoomData) => createOrJoinRoom(params),
    onSuccess: (data) => {
      options.onSuccess(data);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      options.onError(error);
    },
  });
}
