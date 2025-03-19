const Home = () => {
  return (
    <div className="flex justify-center">
      <form className="mt-36  flex flex-col bg-slate-300">
        <input
          className="mx-10 my-6 h-10 p-2"
          type="text"
          placeholder="username"
        />
        <input
          className="mx-10 my-6 h-10 p-2"
          type="password"
          placeholder="password"
        />
      </form>
    </div>
  );
};

export default Home;
