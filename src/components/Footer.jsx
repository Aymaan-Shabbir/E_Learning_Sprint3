import React from "react";

const Footer = () => (
  <footer style={{ backgroundColor: "#f8f9fa", padding: "2rem 0" }}>
    <div className="container d-flex justify-content-around flex-wrap">
      <div>
        <h5>EduSphere</h5>
        <ul className="list-unstyled">
          <li><a href="#about">About Us</a></li>
          <li><a href="#careers">Careers</a></li>
        </ul>
      </div>
      <div>
        <h5>Support</h5>
        <ul className="list-unstyled">
          <li><a href="#faq">Help Center</a></li>
          <li><a href="#support">Customer Support</a></li>
        </ul>
      </div>
      <div>
        <h5>Contact</h5>
        <ul className="list-unstyled">
          <li><a href="mailto:support@edusphere.com">support@edusphere.com</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-4">
      &copy; 2025 EduSphere. All rights reserved.
    </div>
  </footer>
);

export default Footer;
