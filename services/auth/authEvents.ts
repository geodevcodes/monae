import Toast from "react-native-toast-message";

type Listener = () => void;

let logoutListener: Listener | null = null;

export const registerLogoutListener = (listener: Listener) => {
  logoutListener = listener;
};

export const triggerLogout = () => {
  // Show toast immediately
  Toast.show({
    type: "error",
    text1: "Session Expired",
    text2: "You have been logged out. Please login again.",
    position: "top",
    visibilityTime: 4000,
  });
  logoutListener?.();
};
