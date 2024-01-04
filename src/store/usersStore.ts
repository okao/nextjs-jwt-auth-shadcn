import {
  createStore,
  action,
  thunk,
  Action,
  Thunk,
  createTypedHooks,
} from 'easy-peasy';

interface User {
  id: number;
  email: string;
  provider: string;
  socialId?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  status?: {
    id?: number;
    name?: string;
  };
}

interface UserModel {
  user: User;
  // Actions
  addUser: Action<UserModel, User | undefined>;
  // Thunks
  fetchUser: Thunk<UserModel, User | undefined>;
}

const userStroe = createStore<UserModel>({
  user: {} as User,
  addUser: action((state, payload) => {
    state.user = payload as User;
  }),
  fetchUser: thunk(async (actions, payload) => {
    actions.addUser(payload);
  }),
});

const typedHooks = createTypedHooks<UserModel>();

export const useUserActions = typedHooks.useStoreActions;
export const useUserState = typedHooks.useStoreState;
export const useUserDispatch = typedHooks.useStoreDispatch;

export default userStroe;
