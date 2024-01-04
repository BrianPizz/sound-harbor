const Header = () => {
  return (
    <div className="flex bg-slate-200 p-3 justify-between">
      <p className="font-bold text-2xl">Sound Harbor</p>
      <div>
        <button className="text-2xl mx-2">My Account</button>
        <button className="text-2xl mx-2">Cart</button>
      </div>
    </div>
  );
};

export default Header;
