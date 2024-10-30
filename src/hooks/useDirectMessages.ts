import { useEffect, useState, useCallback } from "react";
import { useChatStore } from "../store/chatStore";


const useDirectMessages = (senderId: string, receiverId: string) => {
  const directMessages = useChatStore(state => state.directMessages);
  const setDirectMessages = useChatStore(state => state.setDirectmessages); // Fixed typo in function name
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Start as false
  
  const fetchDirectMessages = useCallback(async () => {
    if (!senderId || !receiverId) {
      console.error('Missing senderId or receiverId');
      setError('Invalid sender or receiver ID');
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error state
    
    const token = localStorage.getItem("jwtToken");
    
    if (!token) {
      console.error('No token found');
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    console.log('Fetching direct messages for:', { senderId, receiverId });

    try {
      const response = await fetch(`/api/directMessages/${senderId}/${receiverId}`, {
        headers: {
			Authorization: token ? token : '',
		},
      });

      console.log('Response status:', response.status);

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
        setDirectMessages([]); // Clear messages on error
        return;
      }

      const data = await response.json();
      console.log('Received direct messages data:', data);

      if (!Array.isArray(data)) {
        console.error('Received non-array data:', data);
        setError('Invalid data format received');
        return;
      }


      setDirectMessages(data);
      setError(null);
      
    } catch (err) {
      console.error('Error fetching direct messages:', err);
      setError("An error occurred while fetching direct messages.");
      setDirectMessages([]); // Clear messages on error
    } finally {
      setIsLoading(false);
    }
  }, [senderId, receiverId, setDirectMessages]);

  // Add dependency on setDirectMessages
  useEffect(() => {
    if (senderId && receiverId) {
      console.log('Effect triggered, fetching messages...');
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