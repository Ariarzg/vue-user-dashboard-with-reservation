import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const storageKey = 'vue-user';

export const useUserStore = defineStore(
  'user',
  () => {
    const currentUser = ref(null);
    const users = ref([]);
    const loading = ref(false);

    async function _hashPassword(plainPassword) {
      try {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(plainPassword, salt);
      } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
      }
    }

    async function _verifyPassword(plainPassword, hashedPassword) {
      try {
        return await bcrypt.compare(plainPassword, hashedPassword);
      } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
      }
    }

    async function signupUser(newUser) {
      loading.value = true;

      try {
        if (currentUser.value) {
          return {
            valid: false,
            message: `You Are Already Logged In. Please Log Out First.`,
          };
        }

        if (_doesUserExist(newUser)) {
          return {
            valid: false,
            message: 'Provided User Already Exist.',
          };
        }

        const user = {
          id: uuidv4(),
          name: newUser.name,
          email: newUser.email,
          password: await _hashPassword(newUser.password),
          reservations: [],
        };

        users.value.push(user);

        return {
          valid: true,
          message: 'Signed Up Successfully.',
        };
      } catch (err) {
        return {
          valid: false,
          message: err,
        };
      } finally {
        loading.value = false;
      }
    }

    async function loginUser(user) {
      loading.value = true;

      try {
        if (currentUser.value) {
          return {
            valid: false,
            message: `You Are Already Logged In. Please Log Out First.`,
          };
        }

        const userExistenceData = _doesUserExist(user);

        if (!userExistenceData) {
          return {
            valid: false,
            message: `Wrong Credentials.`,
          };
        }

        const passwordVerification = await _verifyPassword(
          user.password,
          userExistenceData.password,
        );

        if (!passwordVerification) {
          return {
            valid: false,
            message: `Wrong Credentials.`,
          };
        }

        currentUser.value = userExistenceData;

        return {
          valid: true,
          message: 'Signed In Successfully.',
        };
      } catch (err) {
        console.error(err);
        return {
          valid: false,
          message: err,
        };
      } finally {
        loading.value = false;
      }
    }

    function logoutUser() {
      if (currentUser.value) {
        currentUser.value = null;
        return {
          valid: true,
          message: 'Successfully Logged Out.',
        };
      }
      return {
        valid: false,
        message: 'Unknown Error.',
      };
    }

    function _doesUserExist(user) {
      let userExistenceData = null;

      if (users.value) {
        users.value.forEach((registeredUser) => {
          if (user.email === registeredUser.email) {
            userExistenceData = registeredUser;
          }
        });
      }

      return userExistenceData;
    }

    return {
      currentUser,
      users,
      signupUser,
      loginUser,
      logoutUser,
    };
  },
  {
    persist: {
      key: storageKey,
      pick: ['currentUser', 'users'],
      debug: true,
    },
  },
);
