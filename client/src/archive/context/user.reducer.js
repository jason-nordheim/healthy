import { USER_TYPE } from "./user.type";

export const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_TYPE.PROFILE_REQUEST:
      return {
        request_in_progress: true,
      };
    case USER_TYPE.PROFILE_SUCCESS:
      return {
        request_in_progress: false,
        profile: { ...action.payload },
      };
    case USER_TYPE.PROFILE_FAILURE:
      return {
        request_in_progress: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
