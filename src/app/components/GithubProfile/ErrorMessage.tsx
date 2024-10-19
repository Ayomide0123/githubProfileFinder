interface ErrorProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorProps) {
  return (
    <div className="mt-8 w-full max-w-md bg-red-100 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold text-red-600">Oops! Something went wrong.</h2>
      <p className="text-red-500">{message}</p>
    </div>
  );
}
