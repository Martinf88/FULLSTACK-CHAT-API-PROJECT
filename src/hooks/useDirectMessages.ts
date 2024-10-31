import { useEffect, useState, useCallback } from "react";
import { useChatStore } from "../store/chatStore";


const useDirectMessages = (senderId: string, receiverId: string) => {
  const directMessages = useChatStore(state => state.directMessages);
  const setDirectMessages = useChatStore(state => state.setDirectmessages)
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 
  
  const fetchDirectMessages = useCallback(async () => {
    if (!senderId || !receiverId) {
      console.error('Missing senderId or receiverId');
      setError('Invalid sender or receiver ID');
      return;
    }

    setIsLoading(true);
    setError(null); 
    
    const token = localStorage.getItem("jwtToken");
    
    if (!token) {
      console.error('No token found');
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/directMessages/${senderId}/${receiverId}`, {
        headers: {
			Authorization: token ? token : '',
		},
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Response error:', errorMessage);
        
        if (response.status === 404) {
          setError("Direct messages not found.");
        } else if (response.status === 403) {
          setError("You do not have access to these messages.");
        } else {
          setError(`Failed to fetch direct messages: ${errorMessage}`);
        }
        setDirectMessages([]);
        return;
      }

      const data = await response.json();

      setDirectMessages(data);
      setError(null);
      
    } catch (err) {
      console.error('Error fetching direct messages:', err);
      setError("An error occurred while fetching direct messages.");
      setDirectMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, [senderId, receiverId, setDirectMessages]);

  useEffect(() => {
    if (senderId && receiverId) {
      fetchDirectMessages();
    }
  }, [senderId, receiverId, fetchDirectMessages]);

  return { 
    directMessages, 
    error, 
    isLoading, 
    fetchDirectMessages,
    refetch: fetchDirectMessages 
  };
};

export default useDirectMessages;