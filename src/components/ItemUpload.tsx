import { getFullPath, API_ROUTES } from "../apis/inventory";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ItemUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  const { getAccessTokenSilently } = useAuth0();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedFile(event.target.files![0]);
  };

  async function handleHelp() {
    alert("Please ensure the file is in CSV format with the following columns:\n" + 
          "Name, Quantity, Price, About\n" +
          "Only include actual items in file. Do not include the column names.\n" +
          "You can leave entries blank, besides 'Name' which is required.\nThe following are valid examples:\n" +
          "Item 1,,,Description\n" +
          "Item 2\n" +
          "Item 3, 3, 3.99, description\n" 
    );
  }

  async function handleUpload() {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    try {
      const accessToken = await getAccessTokenSilently();
      
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);
      
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const options = {
        method: "POST",
        headers: headers,
        body: formData,
      };

      const response = await fetch(getFullPath(API_ROUTES.UPLOAD), options);
      console.log("Recived response.");

      if (response.ok === false)
        throw new Error("Failed to upload file.");

      console.log("Response was good.");

      alert(`File uploaded successfully. Please reload to see items on the list.`);


    } catch(e) {
      alert('An error occurred while uploading the file.');
    }   

  };

  return (
    <div id="file-upload">
      <input type="file" onChange={handleFileChange}/>
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleHelp}>File Format</button>
    </div>

  )
}