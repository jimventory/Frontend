import { useContext } from "react";
import Dropzone from "react-dropzone";
import { InventoryContext } from "../contexts/InventoryContext";
import "../stylesheets/ItemImage.css";

export default function ItemImage() {
    const { selectedItem, setSelectedItem } = useContext(InventoryContext);

    if (selectedItem.imageUrl.length === 0) {
        return (
        <div id="imageDropzone">
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
        <img src={selectedItem.imageUrl} alt="Item"/>
    );
};
