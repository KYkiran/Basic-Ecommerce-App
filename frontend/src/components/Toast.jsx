import { CheckCircle, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'success' }) => {
  const bgColor = type === 'success' 
    ? 'bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-700' 
    : 'bg-red-100 dark:bg-red-900 border-red-500 dark:border-red-700';
  const textColor = type === 'success' 
    ? 'text-green-700 dark:text-green-200' 
    : 'text-red-700 dark:text-red-200';
  const Icon = type === 'success' ? CheckCircle : AlertTriangle;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className={`${bgColor} border-l-4 p-4 rounded shadow-md flex items-center transition-colors duration-200`}>
        <Icon className={`${textColor} mr-3`} size={20} />
        <p className={`${textColor}`}>{message}</p>
      </div>
    </div>
  );
};

export default Toast;