import React from 'react';

const Refund: React.FC = () => {
  return (
    <div className="py-8 lg:py-16 mt-28">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid gap-8 lg:gap-12 prose max-w-3xl lg:prose-lg xl:prose-2xl">
          <header className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
              Shipping policy
            </h1>
          </header>
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p>
                At Sampurnakart Innovations Private Limited, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our mobile and electronic device repair services.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Information Collection</h2>
              <p>We collect personal information from you when you:</p>
              <ul>
                <li>Book a Repair Service: This includes your name, address, contact number, email address, and details about your device.</li>
                <li>Use Our Shipping Service: Information about your location and preferred pickup and delivery times.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Use of Information</h2>
              <p>The personal information we collect is used for:</p>
              <ul>
                <li>Providing Services: To pick up, repair, and deliver your devices efficiently.</li>
                <li>Customer Support: To respond to your inquiries and provide support.</li>
                <li>Service Improvement: To improve our services based on your feedback.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Device Pickup and Delivery</h2>
              <ul>
                <li>Pickup Timing: We pick up devices from customers between 9:00 AM and 11:59 AM.</li>
                <li>Delivery Timing: After repair, devices are delivered back to customers within 3 hours to 3 working days, depending on the nature of the repair.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Information Sharing</h2>
              <p>We do not share your personal information with third parties except:</p>
              <ul>
                <li>Service Providers: With trusted service providers who assist us in operating our business and delivering services, including our delivery partner, Delhivery.</li>
                <li>Legal Requirements: If required by law to comply with legal obligations.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Data Security</h2>
              <p>We implement stringent security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Data Retention</h2>
              <p>Your personal information is retained only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Your Rights</h2>
              <ul>
                <li>Access Your Information: Request access to the personal information we hold about you.</li>
                <li>Update Your Information: Request corrections or updates to your personal information.</li>
                <li>Delete Your Information: Request the deletion of your personal information, subject to legal obligations.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Changes to Privacy Policy</h2>
              <p>We may update this Privacy Policy periodically to reflect changes in our practices. We will notify you of any significant changes through our website or other appropriate means.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
