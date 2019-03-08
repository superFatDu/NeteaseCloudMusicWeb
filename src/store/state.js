let uid = "";

try {
  if (sessionStorage.uid) uid = sessionStorage.uid;
} catch (e) {
  throw Error(e);
}

export default {
  uid
};
