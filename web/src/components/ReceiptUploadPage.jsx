import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ReceiptUploadPage() {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedReceipt, setEditedReceipt] = useState({});

    const { receiptText, loading, error } = useSelector((state) => state.receipts);

    useEffect(() => {
        setEditedReceipt(receiptText); // Initialize edited receipt with OCR result
    }, [receiptText]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setIsUploaded(false);
        }
    };

    const handleUpload = () => {
        if (image && !loading) {
            // dispatch(uploadAndProcessImage(image)).then(() => {
            //     setIsUploaded(true);
            // });
        }
    };

    const handleClear = () => {
        // dispatch(clearReceiptText());
        setImage(null);
        setImagePreview(null);
        setIsUploaded(false);
    };

    const handleEditChange = (field, value) => {
        setEditedReceipt((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleItemEditChange = (index, field, value) => {
        setEditedReceipt((prev) => {
            const items = [...prev.items];
            items[index] = { ...items[index], [field]: value };
            return { ...prev, items };
        });
    };

    const saveEdit = () => {
        setIsEditing(false);
        console.log("Edited Receipt Data:", editedReceipt);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="flex flex-row max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg space-x-8">
                <div className="flex-1">
                    <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Receipt Upload</h2>

                    <input type="file" onChange={handleImageChange} className="mb-4" />

                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Preview" className="w-full h-auto rounded" />
                        </div>
                    )}

                    {!isUploaded ? (
                        <button
                            onClick={handleUpload}
                            disabled={!image || loading}
                            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded mb-4"
                        >
                            {loading ? "Processing..." : "Upload and OCR"}
                        </button>
                    ) : (
                        <button
                            disabled
                            className="w-full py-2 bg-green-500 text-white font-semibold rounded mb-4"
                        >
                            OCR Completed
                        </button>
                    )}
                    {error && <p className="text-center text-red-500 mb-4 break-words">{error}</p>}
                </div>

                <div className="flex-1 border-l border-gray-300">
                    <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Scanned Text</h2>
                    {receiptText && (
                        <>
                            <div className="bg-gray-100 p-4 rounded overflow-x-auto">
                                <p>
                                    <strong>Merchant Name:</strong>{" "}
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedReceipt.merchantName || ""}
                                            onChange={(e) => handleEditChange("merchantName", e.target.value)}
                                        />
                                    ) : (
                                        editedReceipt.merchantName || "Not found"
                                    )}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedReceipt.date || ""}
                                            onChange={(e) => handleEditChange("date", e.target.value)}
                                        />
                                    ) : (
                                        editedReceipt.date || "Not found"
                                    )}
                                </p>
                                <p>
                                    <strong>Total:</strong>{" "}
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedReceipt.total || ""}
                                            onChange={(e) => handleEditChange("total", e.target.value)}
                                        />
                                    ) : (
                                        editedReceipt.total || "Not found"
                                    )}
                                </p>
                                <div>
                                    <strong>Items:</strong>
                                    <ul>
                                        {editedReceipt.items?.length > 0 ? (
                                            editedReceipt.items.map((item, index) => (
                                                <li key={index}>
                                                    {isEditing ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                value={item.name || ""}
                                                                onChange={(e) =>
                                                                    handleItemEditChange(index, "name", e.target.value)
                                                                }
                                                                placeholder="Item Name"
                                                            />{" "}
                                                            -{" "}
                                                            <input
                                                                type="text"
                                                                value={item.price || ""}
                                                                onChange={(e) =>
                                                                    handleItemEditChange(index, "price", e.target.value)
                                                                }
                                                                placeholder="Item Price"
                                                            />
                                                        </>
                                                    ) : (
                                                        `${item.name || "Unknown Item"} - ${
                                                            item.price || "Unknown Price"
                                                        }`
                                                    )}
                                                </li>
                                            ))
                                        ) : (
                                            <p>No items found.</p>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-around mt-4">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <button
                                        onClick={saveEdit}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                                    >
                                        Save
                                    </button>
                                )}
                                {/* <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(JSON.stringify(editedReceipt, null, 2))
                                    }
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                >
                                    Copy Text
                                </button> */}
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                                >
                                    Clear Text
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReceiptUploadPage;
