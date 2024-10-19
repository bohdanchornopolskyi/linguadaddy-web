export default function VerifySuccess() {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center flex-grow">
      <h1 className="text-3xl font-bold">
        You've been successfully signed up!
      </h1>
      <span>Please check your email for a verification link</span>
    </div>
  );
}
