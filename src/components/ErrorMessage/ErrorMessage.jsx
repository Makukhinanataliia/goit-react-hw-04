import { useEffect } from "react";
import { toast } from "react-hot-toast"; 

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]); 

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
