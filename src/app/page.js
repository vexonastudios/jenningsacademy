import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] bg-slate-50">
      <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800">Jennings Academy Hub</h1>
        <UserButton afterSignOutUrl="/sign-in" />
      </header>

      <main className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">Parents Dashboard</h2>
          <p className="text-slate-600 mb-4">Manage your children's daily plans and view reports.</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
            Manage Plans
          </button>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">Children Logins</h2>
          <p className="text-slate-600 mb-4">Select a profile to begin today's guided path.</p>
          <div className="flex gap-4">
             {/* Placeholders for kids avatars */}
             <div className="w-16 h-16 bg-blue-100 border-2 border-blue-500 rounded-full flex items-center justify-center font-bold text-blue-600 cursor-pointer hover:scale-105 transition shadow-sm">
                J
             </div>
             <div className="w-16 h-16 bg-pink-100 border-2 border-pink-500 rounded-full flex items-center justify-center font-bold text-pink-600 cursor-pointer hover:scale-105 transition shadow-sm">
                S
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
