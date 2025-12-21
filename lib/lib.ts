export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Helper function to format date for display
export const formatDateForDisplay = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getProgressStyles = (progress: number) => {
  if (progress >= 0 && progress <= 60) {
    return {
      borderColor: "#5F61F5",
      bg: "#EDF2FF",
    };
  }
  if (progress >= 61 && progress <= 85) {
    return {
      borderColor: "#FFA62F",
      bg: "#FFF4E5",
    };
  }
  return {
    borderColor: "#F56C8A",
    bg: "#FFEAF0",
  };
};

export const avatarPlaceholderUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=46`;

export const GOOGLE_CONFIG = {
  webClientId:
    "621054984778-13up9fca031st6qbsnki516a8ioa8b5f.apps.googleusercontent.com",
    // "621054984778-c00gnpitfjpvgn42bglpfv53u52l3a0r.apps.googleusercontent.com"
  iosClientId:
    "621054984778-j2ashj7ghg9em8hq28l6bev1f9np6vca.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  accountName: "Monae",
  profileImageSize: 120,
};
