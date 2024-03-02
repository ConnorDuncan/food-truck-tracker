import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 lg:py-24 bg-blue-100">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="space-y-4 lg:space-y-5">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-black">
            Your Business Name
          </h1>
          <p className="max-w-2xl mx-auto text-black md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
            A brief description of your business. Welcome to our platform.
          </p>
        </div>
        {/* Added mb-12 for more vertical space below this section */}
        <div className="flex justify-center space-x-4 mt-4 mb-12">
          <Link
            className="inline-flex h-11 items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            href="#"
          >
            Login for Customers
          </Link>
          <Link
            className="inline-flex h-11 items-center rounded-md bg-green-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            href="#"
          >
            Login for Businesses
          </Link>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          <div className="space-y-4 lg:space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-black">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {/* Questions and answers sections */}
              <div>
                <h3 className="text-2xl font-bold text-black">What payment methods do you accept?</h3>
                <p className="text-black dark:text-gray-400">
                  We accept all major credit and debit cards, as well as PayPal transactions.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black">Can I cancel or modify my order after it has been placed?</h3>
                <p className="text-black dark:text-gray-400">
                  Yes, you can make changes to your order before it has been shipped. Please contact our customer service team for assistance.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black">What is your return policy?</h3>
                <p className="text-black dark:text-gray-400">
                  We offer a 30-day return policy for all products. If you are not satisfied with your purchase, you can return it for a full refund.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 lg:space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-black">About Your Business</h2>
            <p className="text-black md:text-xl dark:text-gray-400">
              Provide a brief description of your business, the services you offer, or your mission statement. This section is an opportunity to introduce visitors to your company and give them a sense of what sets you apart.
            </p>
          </div>
        </div>
      </div>
      {/* Full-width blue rectangle section */}
      <div className="w-full bg-blue-200">
        <div className="max-w-4xl mx-auto py-10 px-4 md:px-6 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-center md:text-left">
            {/* Sections for customers, contact, and partners */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black">For Customers</h3>
              <p className="text-sm text-black">Access your account and manage your orders</p>
              <Link className="text-sm underline text-black" href="#">Login for Customers</Link>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black">Contact Us</h3>
              <p className="text-sm text-black">Have a question? Send us an email</p>
              <Link className="text-sm underline text-black" href="#">Contact Support</Link>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black">For Business Partners</h3>
              <p className="text-sm text-black">Login to access partner resources</p>
              <Link className="text-sm underline text-black" href="#">Login for Business</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
