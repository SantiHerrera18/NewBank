import "./Styles.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="info-bank">
        <h1>About EBank</h1>
        <p>
          EBank is a digital bank with a mission to provide seamless, secure,
          and efficient financial services to customers around the globe. We
          specialize in personal banking, business solutions, and wealth
          management. With cutting-edge technology and a customer-centric
          approach, we aim to redefine the way people manage their finances.
        </p>
      </div>

      <div className="bank-history">
        <h1>Our Journey</h1>
        <p>
          Founded in 2010, EBank started as a small startup focused on providing
          digital payment solutions. Over the years, we have grown into a
          full-fledged financial institution offering a wide range of services
          including online savings accounts, investment platforms, and
          cryptocurrency trading. Our commitment to innovation and customer
          satisfaction has allowed us to expand our operations to more than 15
          countries worldwide.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
