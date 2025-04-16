import React, { useState, useEffect } from 'react';
import { getAllFAQs, deleteFAQ, createFAQ, updateFAQ } from '../../api/faq.api';

const FAQManagement: React.FC = () => {
  const [faqs, setFAQs] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await getAllFAQs();
      setFAQs(response);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleDelete = async (faqId: string) => {
    try {
      await deleteFAQ(faqId);
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createFAQ(newFAQ);
      setNewFAQ({ question: '', answer: '' });
      fetchFAQs();
    } catch (error) {
      console.error('Error creating FAQ:', error);
    }
  };

  const handleUpdate = async (faqId: string, updatedData: any) => {
    try {
      await updateFAQ(faqId, updatedData);
      fetchFAQs();
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  return (
    <div className="faq-management">
      <h1>Manage FAQs</h1>
      <div className="faq-form">
        <input
          type="text"
          placeholder="Question"
          value={newFAQ.question}
          onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFAQ.answer}
          onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
        />
        <button onClick={handleCreate}>Add FAQ</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq._id}>
              <td>{faq._id}</td>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                <button onClick={() => handleDelete(faq._id)}>Delete</button>
                <button onClick={() => handleUpdate(faq._id, { question: 'Updated Question' })}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FAQManagement;
