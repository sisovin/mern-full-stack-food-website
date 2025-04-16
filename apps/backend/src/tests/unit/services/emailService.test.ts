import { sendEmail } from "../../../services/emailService";
import nodemailer from "nodemailer";

jest.mock("nodemailer");

describe("Email Service", () => {
  it("should send an email successfully", async () => {
    const mockSendMail = jest.fn().mockResolvedValue("Email sent");
    nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

    await sendEmail("test@example.com", "Test Subject", "Test Text");

    expect(mockSendMail).toHaveBeenCalledWith({
      from: process.env.EMAIL_USER,
      to: "test@example.com",
      subject: "Test Subject",
      text: "Test Text",
    });
  });

  it("should handle errors when sending an email", async () => {
    const mockSendMail = jest
      .fn()
      .mockRejectedValue(new Error("Error sending email"));
    nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

    await sendEmail("test@example.com", "Test Subject", "Test Text");

    expect(mockSendMail).toHaveBeenCalledWith({
      from: process.env.EMAIL_USER,
      to: "test@example.com",
      subject: "Test Subject",
      text: "Test Text",
    });
  });
});
