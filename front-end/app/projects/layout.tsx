import ProjectSidebar from "@/components/project-sidebar/ProjectSidebar";

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col h-screen items-center justify-center gap-4">
            <div className="w-full max-w-5xl text-center">
                <ProjectSidebar />
                {children}
            </div>
        </section>
    );
}
