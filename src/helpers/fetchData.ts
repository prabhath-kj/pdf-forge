
export const fetchData = async (url:string, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error:any) {
      console.error('Error fetching data:', error.message);
      throw error; // Re-throw the error to be handled by the calling code
    }
  };
  