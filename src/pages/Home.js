import React from 'react';
import './Home.css'


function Home() {

    const faqs = [
        {
          question: 'How do I sign up as a food truck vendor?',
          answer: 'To sign up as a food truck vendor, please visit our registration page and fill out the necessary information.'
        },
        {
          question: 'Can customers leave reviews for food trucks?',
          answer: 'Yes, registered customers can leave reviews and ratings for food trucks after logging into their accounts.'
        },
        {
          question: 'How can I update my business information?',
          answer: 'Food truck vendors can log in to their accounts to update their business information and menu details.'
        }
        // Add more FAQs as needed
      ];

  return (
    <div className="home-page">
      <h1>Welcome to Vendor Vista!</h1>
      <p>Find your favorite food trucks or track your business.</p>
      <div className="buttons">
        <button className="business-button">Business Login</button>
        <button className="customer-button">Customer Login</button>
      </div>

      <div className='intro'>
      Vendor Vista is a platform that makes it easy for you to discover and connect with local vendors. Our mission is to help students find good food and support local businesses.
      </div>

      <div className='faq'>
        <h2>Frequently Asked Questions</h2>

        <ul>
          {faqs.map((faq, index) => (
            <li key={index}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default Home;