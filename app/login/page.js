import LoginClient from "./LoginClient";

export const metadata = {
  title: "Log In | Homestead CS Club",
};

export default function LoginPage() {
  return (
    <div className="container-max px-4">
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <h1 className="text-center text-3xl md:text-4xl font-semibold mb-8 text-[var(--foreground)]">
          Log In
        </h1>
        <LoginClient />
      </div>
    </div>
  );
}
