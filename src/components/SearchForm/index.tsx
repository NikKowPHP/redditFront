import { Search } from 'lucide-react';

interface SearchFormProps {
  query: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchForm = ({ query, loading, onSubmit, onChange, className = "" }: SearchFormProps) => (
  <form onSubmit={onSubmit} className={`transition-all duration-300 ease-in-out ${className}`}>
    <div className="relative group">
      <input
        type="text"
        value={query}
        onChange={onChange}
        className="
          w-full px-6 py-4 text-lg
          rounded-2xl border border-secondary-border dark:border-secondary-borderDark
          bg-primary-surface dark:bg-primary-surfaceDark
          transition-all duration-200
          focus:ring-1 focus:ring-accent-blue dark:focus:ring-accent-blueDark
          focus:border-accent-blue dark:focus:border-accent-blueDark
          placeholder-secondary-text/50 dark:placeholder-secondary-textDark/50
        "
        placeholder="Ask anything..."
      />
      <button
        type="submit"
        disabled={loading}
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          transition-all duration-200
          text-secondary-text/50 dark:text-secondary-textDark/50
          hover:text-accent-blue dark:hover:text-accent-blueDark
        "
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-accent-blue/30 border-t-accent-blue" />
        ) : (
          <Search className="w-5 h-5" />
        )}
      </button>
    </div>
  </form>
); 