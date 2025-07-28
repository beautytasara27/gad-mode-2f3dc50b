import { useState } from "react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const useEmailGenerator = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateEmail = async (query: string): Promise<string> => {
    // Mock email generation - replace with your preferred AI service
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    const emailTemplates = {
      'follow-up': `Subject: Following up on our conversation

Dear [Name],

I hope this email finds you well. I wanted to follow up on our recent conversation regarding [topic].

I'm very interested in moving forward and would appreciate the opportunity to discuss this further at your convenience.

Please let me know if you need any additional information from my end.

Best regards,
[Your Name]`,
      
      'interview': `Subject: Thank you for the interview opportunity

Dear [Interviewer Name],

Thank you for taking the time to meet with me yesterday to discuss the [Position Title] role at [Company Name].

I enjoyed our conversation about [specific topic discussed] and I'm even more excited about the opportunity to contribute to your team.

If you need any additional information, please don't hesitate to reach out.

Looking forward to hearing from you.

Best regards,
[Your Name]`,
      
      'professional': `Subject: [Your Subject Here]

Dear [Recipient],

I hope this message finds you well.

[Main content of your email - clearly state your purpose and any relevant details]

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Title]
[Contact Information]`
    };

    // Simple keyword matching for demo
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('follow') || lowerQuery.includes('follow-up')) {
      return emailTemplates['follow-up'];
    } else if (lowerQuery.includes('interview') || lowerQuery.includes('job')) {
      return emailTemplates['interview'];
    } else {
      return emailTemplates['professional'];
    }
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const emailResponse = await generateEmail(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: emailResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble generating your email right now. Please try again.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
};