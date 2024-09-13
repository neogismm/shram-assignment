import { useUser } from "../contexts/UserContext";

export default function Profile() {
  const { user, logout } = useUser();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <p>Coming soon!</p>
      {user && <p>User: {user.name}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
