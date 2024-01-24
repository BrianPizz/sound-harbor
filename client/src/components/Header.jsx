import Auth from "../utils/auth";

const Header = () => {
  const isLoggedIn = Auth.loggedIn();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="flex bg-slate-200 p-3 justify-between">
      <p className="font-bold text-2xl">Sound Harbor</p>
        {isLoggedIn ? (
      <div>
            <button className="text-2xl mx-2">My Account</button>
            <button className="text-2xl mx-2">Cart</button>
            <button className="text-2xl mx-2" onClick={logout}>Logout</button>
      </div>
        ) : (
        <div>
            <p className="text-2xl mx-2">Log in</p>
        </div>
        )}
    </div>
  );
};

export default Header;
