let profile = {};

try {
  if (localStorage.profile) profile = localStorage.profile;
} catch (e) {
  throw Error(e);
}

export default {
  profile
};
