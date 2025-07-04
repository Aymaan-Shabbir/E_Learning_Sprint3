import React from "react";

const Footer = () => (
  <footer
    style={{
      backgroundColor: "#4D78B9",
      padding: "3rem 0",
      color: "white",
      borderTop: "1px solid #3c5f95",
    }}
  >
    <div className="container">
      <div className="row text-center text-md-start">
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold">EduSphere</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#about" className="footer-link">
                About Us
              </a>
            </li>
            <li>
              <a href="#careers" className="footer-link">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold">Support</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#faq" className="footer-link">
                Help Center
              </a>
            </li>
            <li>
              <a href="#support" className="footer-link">
                Customer Support
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold">Contact</h5>
          <ul className="list-unstyled">
            <li>
              <a href="mailto:support@edusphere.com" className="footer-link">
                support@edusphere.com
              </a>
            </li>
            <li>
              <a href="#contact" className="footer-link">
                Contact Us
              </a>
            </li>
          </ul>
          <div className="mt-3">
            <a href="#" className="me-3 footer-icon">
              🌐
            </a>
            <a href="#" className="me-3 footer-icon">
              📘
            </a>
            <a href="#" className="footer-icon">
              🐦
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 small" style={{ color: "#e0e0e0" }}>
        &copy; {new Date().getFullYear()} EduSphere. All rights reserved.
      </div>
    </div>

    <style>{`
      .footer-link {
        color: #f1f1f1;
        text-decoration: none;
      }
      .footer-link:hover {
        color: #ffffff;
        text-decoration: underline;
      }
      .footer-icon {
        font-size: 1.2rem;
        color: #f1f1f1;
        text-decoration: none;
      }
      .footer-icon:hover {
        color: #ffffff;
      }
    `}</style>
  </footer>
);

export default Footer;
