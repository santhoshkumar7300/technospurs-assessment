import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[var(--medium-primary-color)] text-white p-4 flex items-center justify-between shadow-md">
        <div className="text-lg font-semibold">Technospurs Assessment</div>
      </header>

      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
