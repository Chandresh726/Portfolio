import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-neutral-950 overflow-hidden fixed inset-0 z-[999]">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-neutral-100">404</h1>
        <h2 className="text-xl text-neutral-400">Page Not Found</h2>
        <div className="pt-4">
          <Link 
            href="/"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 transition-colors text-neutral-100 rounded-md"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
