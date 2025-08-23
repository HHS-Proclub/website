import SignupClient from "./SignupClient";

export const metadata = {
  title: "Sign Up | Homestead CS Club",
};

export default function SignupPage() {
  return (
    <div className="container-max px-4">
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <h1 className="text-center text-3xl md:text-4xl font-semibold mb-8 text-[var(--foreground)]">
          Create an Account
        </h1>
        <SignupClient />
      </div>
    </div>
  );
}
