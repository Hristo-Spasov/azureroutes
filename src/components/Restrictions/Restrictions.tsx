import style from "./Restrictions.module.scss";
const Restrictions = () => {
  return (
    <section className={style.tips_container}>
      <div className={style.inner_container}>
        <h2>Air Travel Tips</h2>
        <p>
          If you're gearing up for a flight,there are a few key things you gotta
          keep in mind when packing your bags and heading to the airport:
        </p>
        <ol>
          <li>
            <strong>Security Rules:</strong> Yup, there's a bunch of rules you
            need to follow when it comes to what you can and can't bring on
            board.
          </li>
          <li>
            <strong>Packing Precautions:</strong> The EU has a list of stuff you
            can't take on the plane at all. No surprises here, it includes
            things like explosives and weapons, but also items that could be
            mistaken for weapons, like toy guns or even baseball bats.
          </li>
          <li>
            <strong>Handy Lists:</strong> To make it easy, they've put together
            handy lists of what's a no-go in your hand luggage and what you
            shouldn't even think about putting in your checked bags.
          </li>
          <li>
            <strong>Liquid Limit:</strong> Ah yes, the infamous liquid limit!
            Because, you know, you can't be too careful with liquid explosives.
            So, when it comes to stuff like shampoo and toothpaste, they're
            pretty strict. Keep those bottles under 100 ml, and all packed up in
            a clear plastic bag.
          </li>
          <li>
            <strong>Exceptions:</strong> But don't worry, essential stuff like
            meds and baby food get a pass. Just be ready to prove they're the
            real deal if asked.
          </li>
          <li>
            <strong>Duty-Free Finds:</strong> Got some duty-free goodies? No
            worries, you can bring 'em along. Just make sure they stay sealed in
            the special security bag you got when you bought 'em.
          </li>
          <li>
            <strong>Security Check Shuffle:</strong> When you hit the security
            checkpoint, it's all about being prepared. Toss those liquids in a
            tray, shed your jacket, and don't forget to empty your pockets of
            all that spare change and keys. Oh, and your laptop? That needs its
            own tray too.
          </li>
        </ol>
        <p>
          Oops,We almost forgot you might want to get yourself a travel{" "}
          <a
            href="https://ektatraveling.tp.st/AyDoQYZe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Insurance"
          >
            insurance
          </a>
          ,you know just in case.So, there you have it! Follow these tips,
          breeze through security, and get ready for a smooth takeoff. Happy
          travels!
        </p>
      </div>
    </section>
  );
};

export default Restrictions;
