import { useState } from "react";

// Auth removed — always return 0 unread messages for demo purposes
export const useUnreadCount = () => {
  const [count] = useState(0);
  return count;
};
