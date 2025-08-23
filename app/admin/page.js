import Section from "@/components/Section";
import AdminClient from "./AdminClient";

export const metadata = {
  title: "Admin | Homestead CS Club",
};

export default function AdminPage() {
  return (
    <div className="container-max px-4">
      <Section title="Admin">
        <AdminClient />
      </Section>
    </div>
  );
}
