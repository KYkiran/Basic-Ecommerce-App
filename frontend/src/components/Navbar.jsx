import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <nav className="bg-gray-800 dark:bg-gray-800 text-white shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShoppingCart size={24} />
          <h1 className="text-xl font-bold">Product Manager</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-medium hidden md:inline">Manage your products with ease</span>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-green-700 dark:hover:bg-green-800 focus:outline-none transition-colors duration-200"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;