import { getAllFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ } from '../services/faqService';

const getAllFAQs = async (req, res) => {
  try {
    const faqs = await getAllFAQs();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFAQById = async (req, res) => {
  try {
    const faqId = req.params.id;
    const faq = await getFAQById(faqId);
    res.status(200).json(faq);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createFAQ = async (req, res) => {
  try {
    const faqData = req.body;
    const newFAQ = await createFAQ(faqData);
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFAQ = async (req, res) => {
  try {
    const faqId = req.params.id;
    const updateData = req.body;
    const updatedFAQ = await updateFAQ(faqId, updateData);
    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFAQ = async (req, res) => {
  try {
    const faqId = req.params.id;
    await deleteFAQ(faqId);
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getAllFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ };
