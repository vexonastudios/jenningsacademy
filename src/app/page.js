import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  
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
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2 text-slate-800">Parents Dashboard</h2>
            <p className="text-slate-500 mb-6 font-medium">Manage your children's daily plans and view reports.</p>
            <a href="/parent" className="inline-block bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-md hover:shadow-indigo-600/20">
              Manage Plans
            </a>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2 text-slate-800">Children Logins</h2>
            <p className="text-slate-500 mb-6 font-medium">Select a profile to begin today's guided path.</p>
            <div className="flex gap-4">
              <a href="/path" className="w-16 h-16 bg-blue-100 border-2 border-blue-500 rounded-full flex items-center justify-center font-extrabold text-2xl text-blue-600 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
                  J
              </a>
              <a href="/path" className="w-16 h-16 bg-pink-100 border-2 border-pink-500 rounded-full flex items-center justify-center font-extrabold text-2xl text-pink-600 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-pink-500/20 transition-all">
                  S
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
