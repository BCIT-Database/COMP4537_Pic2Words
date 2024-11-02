
import './uploadPage.css';
import { useState, useRef } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { CloudUpload } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { uploadAndProcessImage, clearReceiptText } from "../slices/receiptSlice";
import axios from 'axios';

function Upload() {
    const dispatch = useDispatch();
    const [content, setContent] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const contentInputRef = useRef(null); 
    const { receiptText, loading, error } = useSelector((state) => state.receipts); 
    console.log('receiptText:', receiptText)


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', content);
        console.log(`content-->`, content);

        try {
            // Call dispatch for OCR processing
            await dispatch(uploadAndProcessImage(content)); //  Use content to request OCR processing

            // Update state on upload success
            setContent(null);
            setUploadSuccess(true);
            if (contentInputRef.current) {
                contentInputRef.current.value = null; 
            }
        
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadSuccess(false);
        }
    };

    const handleClear = () => {
        dispatch(clearReceiptText()); 
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(receiptText); 
    };

    return (
        <Container className="custom-margin">
            <h2 className="text-primary mb-3">Upload Receipts</h2>
            <Card 
                className="border border-primary border-dashed p-3"
                onDragOver={eventObject => eventObject.preventDefault()} 
                onDrop={eventObject => {
                    eventObject.preventDefault(); // Prevent default action
                    const droppedFile = eventObject.dataTransfer.files[0];
                    setContent(droppedFile);
                }}
            >
                <Row className="align-items-center">
                    <Col xs={2} className="text-center">
                        <CloudUpload size={50} className="text-muted" />
                    </Col>
                    <Col xs={6}>
                        <p className="mb-1 font-weight-bold">Select a file</p>
                        <p className="text-muted small">Click add, or drag and drop a file into this box</p>
                    </Col>
                    <Col xs={4} className="d-flex flex-column align-items-center">
                        {content ? (
                            <>
                                <img
                                    src={URL.createObjectURL(content)} // Create a temporary URL for a Blob or File object
                                    alt="Uploaded file"
                                    className="border rounded mb-2"
                                    style={{ width: "100px", height: "60px", objectFit: "cover" }}
                                />
                                <Button variant="link" className="text-danger p-0" onClick={() => setContent(null)}>Remove</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="link" className="text-primary" onClick={() => contentInputRef.current.click()}>
                                    Add
                                </Button>
                                <input
                                    type="file"
                                    ref={contentInputRef}
                                    onChange={eventObject => {
                                        const selectedFile = eventObject.target.files[0];
                                        setContent(selectedFile);
                                    }}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </Card>

            {content && (
                <Button
                    variant="primary"
                    className="mt-3"
                    onClick={handleSubmit} 
                >
                    Upload
                </Button>
            )}

            <Card className="bg-light mt-4 p-3">
                <h5>Tip</h5>
                <ul className="text-muted small">
                    <li>Rotated correctly (not upside down or sideways)</li>
                    <li>In focus and easy to read</li>
                    <li>A JPG, PNG or GIF file</li>
                </ul>
                {uploadSuccess && ( 
                    <div className="mt-3 text-success">
                        <strong>File uploaded successfully!</strong>
                        <Button variant="link" className="text-primary" onClick={handleCopyText}>Copy OCR Result</Button> 
                        <Button variant="link" className="text-danger" onClick={handleClear}>Clear OCR Result</Button> 
                    </div>
                )}
                {error && <p className="text-danger">{error}</p>} 
                {receiptText && (
                    <div className="mt-2">
                        <h6>OCR Result:</h6>
                        <p>{receiptText}</p>
                    </div>
                )}
            </Card>
        </Container>
    );
}

export default Upload;
