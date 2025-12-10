import React from "react";

const RefundReturns = () => {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.7,
        color: "#374151",
      }}
    >
      {/* Heading */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "2rem",
          color: "#1e40af",
        }}
      >
        Refund and Returns Policy
      </h1>

      {/* Overview */}
      <h2>Overview</h2>
      <p>
        Our refund and returns policy lasts 30 days. If more than 30 days have passed since your purchase, we are unable to offer a full refund or exchange.
      </p>

      {/* Eligibility for Returns */}
      <h2>Eligibility for Returns</h2>
      <p>To be eligible for a return:</p>
      <ul>
        <li>The item must be unused and in the same condition as received.</li>
        <li>The item must be in its original packaging.</li>
      </ul>
      <p>Non-returnable items include, but are not limited to:</p>
      <ul>
        <li>Perishable goods (e.g., food, flowers, newspapers, magazines)</li>
        <li>Intimate or sanitary products</li>
        <li>Hazardous materials or flammable liquids/gases</li>
        <li>Gift cards</li>
        <li>Downloadable software products</li>
        <li>Certain health and personal care items</li>
      </ul>
      <p>A receipt or proof of purchase is required to complete a return.</p>
      <p><strong>Note:</strong> Do not send items back to the manufacturer.</p>

      {/* Partial Refunds */}
      <h2>Partial Refunds</h2>
      <p>Partial refunds may be granted in the following situations:</p>
      <ul>
        <li>Items showing obvious signs of use</li>
        <li>Opened CDs, DVDs, software, video games, or similar media</li>
        <li>Items not in original condition, damaged, or missing parts for reasons not caused by us</li>
        <li>Returns submitted more than 30 days after delivery</li>
      </ul>

      {/* Refunds */}
      <h2>Refunds</h2>
      <p>
        Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original method of payment within a specified number of days.
      </p>

      <h3>Late or Missing Refunds</h3>
      <p>
        If you haven’t received a refund, please first check your bank account, then your credit card statement, and contact your bank if necessary.
      </p>

      <h3>Sale Items</h3>
      <p>Only regular-priced items are eligible for refunds. Sale items are non-refundable.</p>

      <h3>Exchanges</h3>
      <p>
        We replace items only if they are defective or damaged. Requests for exchanges are evaluated on a case-by-case basis.
      </p>

      <h3>Gifts</h3>
      <p>
        If the item was marked as a gift at purchase and shipped directly to you, you will receive a gift credit for the value of your return.
      </p>

      <h3>Shipping Returns</h3>
      <p>
        Customers are responsible for paying their own shipping costs when returning items. Shipping fees are non-refundable. We recommend using a trackable shipping service or purchasing shipping insurance for valuable items.
      </p>

      <h3>Need Help?</h3>
      <p>
        For any questions related to refunds, returns, or exchanges, please contact our customer support team.
      </p>
    </div>
  );
};

export default RefundReturns;
