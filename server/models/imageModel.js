import db from '../config/mysql.js'

export const addImage = async (postData) => {
    // console.log(`postData-->`, postData)
    const addImageSQL = `
        INSERT INTO receipt
        (user_id, url, created_at) 
        VALUES (:userId, :url, :created_at);
    `
    const params ={
        userId: postData.userId,
        url: postData.url.secure_url,
        created_at: postData.createdAt
    }
    try{
        const result = await db.query(addImageSQL, params);
        console.log('successfully inserted new image to db:', result);
        return true;
    } catch(err){
        console.error('Error inserting new image to db:', err);
        return false;
    }
}