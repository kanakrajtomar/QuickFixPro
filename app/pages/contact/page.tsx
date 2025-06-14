"use client";

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone:string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone:'',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: '' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const errors: Partial<FormData> = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
        errors.phone = 'Phone is required';
      }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmissionStatus('success');
          setFormData({ name: '', email: '',phone:'', message: '' }); // Clear form after successful submission
        } else {
          setSubmissionStatus('error');
        }
      } catch (error) {
        setSubmissionStatus('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen mt-28 flex flex-col items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center mb-6">
          SAMPURNAKART INNOVATIONS Pvt. Ltd.
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input

              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              name="phone"
              type="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-indigo-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-indigo-700 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>

        {/* Success/Error Messages */}
        {submissionStatus === 'success' && (
          <p className="mt-4 text-green-600">Message sent successfully!</p>
        )}
        {submissionStatus === 'error' && (
          <p className="mt-4 text-red-600">Error sending message. Please try again later.</p>
        )}

        {/* Contact Information Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <address className="not-prose">
            <p className="text-gray-600">
              Merchant Legal entity name: <span className="font-medium">SAMPURNAKART INNOVATIONS PRIVATE LIMITED</span>
            </p>
            <p className="text-gray-600">
              Registered Address: <br />
              <span className="font-medium">
                SHOP NO 4, KAMBRA, SADHU SINGH COLONY, JALANDHAR,
                JALANDHAR, PUNJAB, 144026
              </span>
            </p>
            <p className="text-gray-600">
              Operational Address: <br />
              <span className="font-medium">
                SHOP NO 4, KAMBRA, SADHU SINGH COLONY, JALANDHAR,
                JALANDHAR, PUNJAB, 144026
              </span>
            </p>
            <p className="text-gray-600">
              Telephone No: <span className="font-medium">9914951555</span>
            </p>
            <p className="text-gray-600">
              E-Mail ID: <span className="font-medium">info@sampurnakart.in</span>
            </p>
          </address>
        </div>
      </div>
    </div>
  );
}
