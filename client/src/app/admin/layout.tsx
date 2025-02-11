import { ProtectedRoute } from "@/components/protected-route";
import { UserProvider } from "@/contexts/user-context";

export default function Layout({
  children,
  categories,
  products,
}: {
  children: React.ReactNode;
  categories: React.ReactNode;
  products: React.ReactNode;
}) {
  return (
    <UserProvider>
      <ProtectedRoute>
        <div className="flex-1 overflow-auto p-8">
          {children}
          <div className="mt-8 space-y-8">
            <div>{categories}</div>
            <div>{products}</div>
          </div>
        </div>
      </ProtectedRoute>
    </UserProvider>
  );
}
