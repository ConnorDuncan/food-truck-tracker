import Button from "../components/button.js"

export default function Component() {
  return (
    <>
      <div className="flex flex-col items-center space-y-4 lg:py-12 lg:flex-row lg:space-y-0 lg:space-x-12 lg:items-stretch">
        <div className="grid max-w-4xl gap-4 px-4 lg:grid-cols-2 lg:gap-6 lg:px-10">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl">
              Vendor Vista
            </h1>
            <h1 className="text-2xl lg:text-4xl xl:text-2xl">
              Connect with your local small businesses
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Vendor Vista is a platform that makes it easy for you to discover and connect with local vendors.
              
              Our mission is to help students find good food and support local businesses.
            </p>
            <div className="flex flex-col gap-2">
              <Button text="Sign up for free" backgroundColor="#000000" textColor="#ffffff"></Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">Trusted by 0 businesses worldwide</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Button className="w-full" text="Login for Customers" backgroundColor="#000000" textColor="#ffffff"></Button>
            <Button className="w-full" variant="outline" text="Login for Businesses" textColor="#000000" borderColor='#000000'></Button>
            <Button className="w-full" text="View Local Vendors Near You" backgroundColor="#000000" textColor="#ffffff"></Button>
          </div>
        </div>
        <div className="w-full max-w-4xl p-4 lg:p-0">
          <div className="grid gap-4 p-4 border rounded-lg bg-gray-100/40 dark:bg-gray-800/40">
            <h2 className="font-semibold">Why use VendorVista?</h2>
            <div className="grid gap-4 text-sm text-black-500 lg:grid-cols-2 light:text-gray-400">
              <div className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 flex-shrink-0" />
                <p>Discover local vendors offering unique and high-quality products</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 flex-shrink-0" />
                <p>Simplify the procurement process with our easy-to-use platform</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 flex-shrink-0" />
                <p>Support local businesses and contribute to your community's growth</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 flex-shrink-0" />
                <p>Connect with vendors who share your commitment to excellence and innovation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl p-4 mx-auto my-10 space-y-4 lg:my-20 lg:space-y-10">
        <div className="grid gap-4">
          <h2 className="font-bold">Frequently Asked Questions</h2>
          <div className="grid gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-t pt-4 grid gap-2">
              <h3 className="font-semibold">How can I sign up for a VendorVista account?</h3>
              <p>
                You can sign up for a VendorVista account by visiting our website and clicking on the "Sign Up" button.
                Follow the instructions to create your account, and you'll be able to access our platform and start
                connecting with local vendors in no time.
              </p>
            </div>
            <div className="border-t pt-4 grid gap-2">
              <h3 className="font-semibold">Can I use VendorVista to find vendors in my area?</h3>
              <p>
                Yes, VendorVista is designed to help businesses connect with local vendors. Once you've created an
                account, you'll be able to search for vendors based on your location and the products or services you're
                interested in. Whether you're looking for a supplier of fresh produce, handmade goods, or professional
                services, VendorVista can help you find the right vendors for your needs.
              </p>
            </div>
            <div className="border-t pt-4 grid gap-2">
              <h3 className="font-semibold">What types of vendors can I find on VendorVista?</h3>
              <p>
                VendorVista offers a wide range of vendors, including local artisans, small businesses, and independent
                suppliers. You'll find vendors offering a variety of products and services, from handmade crafts and
                artisanal foods to professional services such as marketing, web design, and consulting. Whether you're
                looking for unique products to sell in your store or services to help your business grow, VendorVista
                has you covered.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl p-4 mx-auto my-10 lg:my-20">
        <div className="grid gap-4">
          <h2 className="font-bold">Frequently Asked Questions</h2>
          <div className="grid gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-t pt-4 grid gap-2">
              <h3 className="font-semibold">How can I sign up for a VendorVista account?</h3>
              <p>
                You can sign up for a VendorVista account by visiting our website and clicking on the "Sign Up" button.
                Follow the instructions to create your account, and you'll be able to access our platform and start
                connecting with local vendors in no time.
              </p>
            </div>
            <div className="border-t pt-4 grid gap-2">
              <h3 className="font-semibold">Can I use VendorVista to find vendors in my area?</h3>
              <p>
                Yes, VendorVista is designed to help businesses connect with local vendors. Once you've created an
                account, you'll be able to search for vendors based on your location and the products or services you're
                interested in. Whether you're looking for a supplier of fresh produce, handmade goods, or professional
                services, VendorVista can help you find the right vendors for your needs.
              </p>
            </div>
            <div className="border-t pt-4 grid gap-2">
              <h3 className="font-semibold">What types of vendors can I find on VendorVista?</h3>
              <p>
                VendorVista offers a wide range of vendors, including local artisans, small businesses, and independent
                suppliers. You'll find vendors offering a variety of products and services, from handmade crafts and
                artisanal foods to professional services such as marketing, web design, and consulting. Whether you're
                looking for unique products to sell in your store or services to help your business grow, VendorVista
                has you covered.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="mx-auto grid max-w-4xl gap-4 p-4 lg:grid-cols-3 lg:gap-10 lg:p-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">For Customers</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Ready to discover amazing local vendors and find unique products? Sign up for a VendorVista account and
              start exploring today.
            </p>
            <Button>Sign up</Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">For Businesses</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Want to connect with local businesses and access a wide range of products and services? Sign up for a
              VendorVista account and start exploring today.
            </p>
            <Button>Sign up</Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Have a question or need assistance? Contact our support team and we'll be happy to help.
            </p>
            <Button>Contact support</Button>
          </div>
        </div>
      </div>
    </>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}





