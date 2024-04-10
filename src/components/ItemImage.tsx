import { Dispatch, SetStateAction } from "react";
import Dropzone from "react-dropzone";
import { getFullPath, IMAGE_CLIENT_ID, API_ROUTES} from "../apis/images";
import "../stylesheets/ItemImage.css";
import { Item } from "../abstractions/Item";

interface ItemImageProps {
    tempItem: Item,
    setTempItem: Dispatch<SetStateAction<Item | null>>,
}

export default function ItemImage( { tempItem, setTempItem } : ItemImageProps) {
    async function uploadAndSetImage(files: File[]) {
        try {
            if (files.length !== 1)
                throw new Error("Only one image per file is supported");
           
            const file = files[0];
          
            console.log(file);

            const header = {
                Authorization: `Client-ID ${IMAGE_CLIENT_ID}`,
            };

            const form = new FormData();
            form.append("image", file);

            const options = {
                method: "POST",
                headers: header,
                body: form,
            };

            console.log(getFullPath(API_ROUTES.UPLOAD));

            const response = await fetch(getFullPath(API_ROUTES.UPLOAD), options);

            console.log("Sending POST request");
            console.log(response);

            if (response.ok === false)
                throw new Error("Failed to upload image");

            console.log("We reached here");

            // If execution reaches here, we successfully uploaded the image and can now set the URL.
            // This class uses tempItem because we still want to keep behavior of not saving changes to server until user manually does so.
   
            const json = await response.json();

            const modifiedItem = { ...tempItem };
            modifiedItem.imageUrl = json.data.link;

            console.log("Updating item");

            setTempItem(modifiedItem);

        } catch (e) {
            alert(`Something went wrong when uploaded your image.`);
        }
    };

    if (tempItem.imageUrl === undefined || tempItem.imageUrl.length === 0) {
        return (
        <div id="imageDropzone">
        <Dropzone onDrop={uploadAndSetImage}>
        {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Click here or drag an image here to associate this item with an image.</p>
                </div>
                </section>
                )}
        </Dropzone>
        </div>
        );
    }

    return (
        <img src={tempItem.imageUrl} alt="Item"/>
    );
};
