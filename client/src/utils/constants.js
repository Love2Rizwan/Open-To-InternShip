// This constant represents the scale factor calculation
export const scaleFactor = 621 / 900;

// The base URL for the API endpoints
const baseUrl = 'https://open-to-internship.onrender.com/functionup';

// This function returns the API URL for fetching college details based on college name
export const collegeDetailsApi = (collegeName) => `${baseUrl}/collegeDetails?collegeName=${collegeName}`;

// This constant represents the API URL for placement interest
export const placementInterestAip = `${baseUrl}/interns`;
