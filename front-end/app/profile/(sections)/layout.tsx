import ProfileNav from "@/components/profile-nav/ProfileNavbar";

export default function ProfileSectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <ProfileNav />
        {children}
      </div>
    </section>
  );
}
