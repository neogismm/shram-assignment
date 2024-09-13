import { useUser } from "../contexts/UserContext";

export default function Profile() {
  const { user, logout } = useUser();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Hello {user.name}!</h1>
      <button
          onClick={logout}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
    </div>
  );
}
