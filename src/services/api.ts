export interface AdmissionEnquiry {
  name: string;
  email: string;
  phone: string;
  program: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

// Set VITE_API_BASE_URL in your frontend .env file.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  async submitAdmissionEnquiry(
    enquiry: AdmissionEnquiry
  ): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/AdmissionEnquiry/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: enquiry.name,
            email: enquiry.email,
            phone: enquiry.phone,
            course: enquiry.program,
            description: enquiry.message,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Unable to send your enquiry.",
        };
      }

      return {
        success: result.success === true,
        message: result.message || "Enquiry submitted successfully.",
      };
    } catch (error) {
      console.error("Admission enquiry API error:", error);

      return {
        success: false,
        message: "Unable to connect to the server. Please try again.",
      };
    }
  },
};