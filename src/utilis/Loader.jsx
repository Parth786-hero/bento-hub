export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-y-4">
      <div className="w-10 h-10 border-4 border-green border-t-transparent rounded-full animate-spin"></div>
      <h2 className="tracking-wider text-[1rem] text-center font-bold">Fetching...</h2>
    </div>
  );
}
