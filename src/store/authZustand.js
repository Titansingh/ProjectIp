import {create} from 'zustand';
import useAsyncStorage from '../hooks/useAsyncStorage';

const useAuthStore = create(set => {
  const {storeData, getData} = useAsyncStorage();

  return {
    authState: {
      isAuthenticated: false,
      tokens: {
        auth: '',
        refresh: '',
      },
    },
    checkAuthenticationStatus: async () => {
      try {
        const authToken = await getData('auth');
        const refreshToken = await getData('refresh');
        console.log(authToken);
        const isAuthenticated = Boolean(authToken);
        set({
          authState: {
            isAuthenticated,
            tokens: {
              auth: authToken ?? '',
              refresh: refreshToken ?? '',
            },
          },
        });
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    },
    setToken: async (authToken, refreshToken) => {
      if (authToken || refreshToken) {
        try {
          await storeData('auth', authToken ?? '');
          await storeData('refresh', refreshToken ?? '');
          set(state => ({
            authState: {
              isAuthenticated: true,
              tokens: {
                auth: authToken || state.authState.tokens.auth,
                refresh: refreshToken || state.authState.tokens.refresh,
              },
            },
          }));
        } catch (error) {
          console.error('Error setting tokens:', error);
        }
      }
    },
    updateToken: async (authToken, refreshToken) => {
      if (authToken || refreshToken) {
        try {
          await storeData('auth', authToken ?? '');
          await storeData('refresh', refreshToken ?? '');
          set(state => ({
            authState: {
              ...state.authState,
              tokens: {
                auth: authToken || state.authState.tokens.auth,
                refresh: refreshToken || state.authState.tokens.refresh,
              },
            },
          }));
        } catch (error) {
          console.error('Error updating tokens:', error);
        }
      }
    },
    onLogout: async () => {
      await storeData('auth', '');
      await storeData('refresh', '');
      set({
        authState: {
          isAuthenticated: false,
          tokens: {
            auth: '',
            refresh: '',
          },
        },
      });
    },
  };
});

export default useAuthStore;
