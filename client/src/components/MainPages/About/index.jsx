import React from "react";
import styles from "./styles.module.scss";

const About = () => {
  return (
    <div>
      <h2 className={styles.page__title}>About us</h2>
      <p className={styles.about__text}>
        YavShop is the largest online retailer in the country. Since 2005, we
        have been realizing the little dreams and grand plans of millions of
        people. We can find literally everything. We sell at a fair price and
        provide a guarantee, because we believe that online shopping should be
        as convenient and safe as possible. And every time someone clicks "Buy",
        we realize that we are doing the right thing.
      </p>
      <img
        className={styles.logo}
        src="https://res.cloudinary.com/dc9sc9g4i/image/upload/v1647551248/Online-shop/qwe_lla3kz.png"
        alt="Logo"
      />
      <h4 className={styles.article__title}>Our goal is to be useful</h4>
      <p className={styles.about__text}>
        We believe that things exist to make life easier, more enjoyable and
        better. Therefore, the search for the same thing should be fast,
        convenient and enjoyable. We don't just sell appliances, electronics,
        jewelry or wine. We help you find exactly what you need, in one place
        and without unnecessary worries, so that you do not spend your life
        searching, but just live happily. Rozetka is a universal answer to any
        query, the beginning of the search and its final stop, a real helper. We
        permanently rid our customers of unpleasant compromises, fulfill desires
        and allow them to dream more boldly. Thanks to smart search and honest
        service, we make the lives of our customers a little better right now.
      </p>
    </div>
  );
};

export default About;
