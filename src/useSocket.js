import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); 

export default function useSocket(eventName, callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (data) => {
      savedCallback.current(data);
    };

    socket.on(eventName, handler);
    return () => {
      socket.off(eventName, handler);
    };
  }, [eventName]);
}
