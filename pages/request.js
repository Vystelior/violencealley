export default function RequestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl text-red-500 font-bold mb-2">Request a Series / Episode</h1>
        <p className="text-gray-400">Submit your favorite Adult Swim shows to add!</p>
      </header>

      <form className="w-full max-w-xl flex flex-col gap-4">
        <input type="text" placeholder="Series Name" className="p-3 rounded-lg bg-gray-800 border border-red-500 text-white" />
        <input type="text" placeholder="Episode / Season (optional)" className="p-3 rounded-lg bg-gray-800 border border-red-500 text-white" />
        <textarea placeholder="Additional notes" className="p-3 rounded-lg bg-gray-800 border border-red-500 text-white"></textarea>
        <button type="submit" className="p-3 bg-red-500 hover:bg-pink-600 rounded-lg font-bold">Submit Request</button>
      </form>

      <footer className="mt-auto text-center mt-12">
        <a href="/" className="text-cyan-400 underline">Back to Home</a>
      </footer>
    </div>
  );
}
