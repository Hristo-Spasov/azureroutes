import style from "./Introduction.module.scss";

const Introduction = () => {
  return (
    <section className={style.introduction_container}>
      <div className={style.inner_container}>
        <h1>Welcome to Azure Routes.</h1>
        <p>
          It's your go-to hub for daily airport schedules worldwide. Say goodbye
          to endless searches on various airport websites - with Azure Routes,
          you can easily access schedules for airports across the globe, all in
          one place.
        </p>
        <p>
          Our mission is to simplify travel planning and enhance your journey
          experience. Whether you're a seasoned traveler or embarking on your
          first adventure, Azure Routes is here to streamline your travel plans
          and make every step of your journey smoother.
        </p>
        <p>
          Join us and let's embark on seamless travel experiences together.
          Welcome aboard!
        </p>
      </div>
    </section>
  );
};

export default Introduction;
