import React from "react";
import {
  FaCheckCircle,
  FaDollarSign,
  FaShippingFast,
  FaHeadset,
} from "react-icons/fa";

export default function FooterFeatures() {
  const features = [
    {
      id: 1,
      icon: <FaCheckCircle size={24} />,
      title: "High Quality Selection",
      text: "Total product quality control for peace of mind",
    },
    {
      id: 2,
      icon: <FaDollarSign size={24} />,
      title: "Affordable Prices",
      text: "Factory direct prices for maximum savings",
    },
    {
      id: 3,
      icon: <FaShippingFast size={24} />,
      title: "Express Shipping",
      text: "Fast, reliable delivery from global warehouses",
    },
    {
      id: 4,
      icon: <FaHeadset size={24} />,
      title: "Worry Free",
      text: "Instant access to professional support",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "2.5rem 0",
        borderTop: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <style>
        {`
          .footer-features-container {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            gap: 1rem;
          }

          .footer-feature {
            flex: 1 1 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 1rem;
            min-width: 150px;
          }

          .footer-feature-icon {
            margin-bottom: 1rem;
            font-size: 24px;
          }

          .footer-feature-title {
            font-size: 1rem;
            font-weight: 600;
            color: #000;
            margin-bottom: 0.5rem;
          }

          .footer-feature-text {
            font-size: 0.875rem;
            color: #666;
            line-height: 1.4;
            margin: 0;
          }

          @media (max-width: 1024px) {
            .footer-feature {
              flex: 1 1 45%;
            }
          }

          @media (max-width: 768px) {
            .footer-feature {
              flex: 1 1 80%;
              min-width: 80px;
              margin: 0.5rem 0;
            }
            .footer-feature-icon {
              font-size: 20px;
            }
            .footer-feature-title {
              font-size: 0.875rem;
            }
            .footer-feature-text {
              display: none;
            }
          }
        `}
      </style>

      <div className="footer-features-container">
        {features.map((item) => (
          <div key={item.id} className="footer-feature">
            <div className="footer-feature-icon">{item.icon}</div>
            <h3 className="footer-feature-title">{item.title}</h3>
            <p className="footer-feature-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
