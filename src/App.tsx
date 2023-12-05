import style from "./App.module.scss";

function App() {
  return (
    <main>
      <div className={style.main}>
        <form role="search" className={style.search_wrapper}>
          <input
            placeholder="Search..."
            type="search"
            className={style.search}
          />
          <button type="submit" className={style.search_button}>
            search
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
