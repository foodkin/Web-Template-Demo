import Link from "next/link";

export default function AdminDashboard() {
  const menuItems = [
    {
      name: "Manajemen Pesanan",
      href: "/admin/orders",
      description: "Kelola pesanan pelanggan",
    },
    {
      name: "Manajemen Customer",
      href: "/admin/customers",
      description: "Kelola data customer",
    },
    {
      name: "Pengaturan Sistem",
      href: "/admin/settings",
      description: "Pengaturan sistem aplikasi",
    },
    {
      name: "Manajemen Customer",
      href: "/admin/customers",
      description: "Kelola data customer",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
