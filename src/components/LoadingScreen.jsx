const LoadingScreen = () => {
  return (
    <div className="flex justify-center spinner items-center min-h-[calc(100vh-132px)]">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;